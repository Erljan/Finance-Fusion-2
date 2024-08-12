from django.shortcuts import render
from rest_framework.decorators import api_view
import yfinance as yf
from rest_framework.views import APIView
# from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.permissions import IsAuthenticated
from .serializers import WatchlistSerializer
from .models import StockWatchlist
from django.shortcuts import render, get_object_or_404
from datetime import datetime
from django.core.cache import cache


# Get the stock name and price


class GetStock(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, symbol):
        stock_price = yf.Ticker(symbol).history(period='1d').Close.iloc[-1] # Get the latest closing price

        stock_name = yf.Ticker(symbol).info['longName']  # Get the stock price name
        recent_datas = yf.download(symbol, period="1d", interval='1m')
        times = recent_datas.index
        values = recent_datas['Close']

        fiftyLow = yf.Ticker(symbol).info['fiftyTwoWeekLow']
        fiftyHigh = yf.Ticker(symbol).info['fiftyTwoWeekHigh']
        dayLow = yf.Ticker(symbol).info['dayLow']
        dayHigh = yf.Ticker(symbol).info['dayHigh']
        currency = yf.Ticker(symbol).info['currency']
        summary = yf.Ticker(symbol).info['longBusinessSummary']

        data = []
        for time, value in zip(times,values):
            formatted_time = time.strftime('%H:%M')
            data.append({"time": formatted_time, "value": round(value,2)})
        # print(data)

        response_data = {
            'name': stock_name,
            'price': round(stock_price, 2),
            'fiftyLow': fiftyLow,
            'fiftyHigh': fiftyHigh,
            'dayLow': dayLow,
            'dayHigh': dayHigh,
            'summary': summary,
            'currency': currency,
            'data': data,
        }

        return Response(response_data, status=HTTP_200_OK)
    


class GetStockPrices(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, symbol):
        stock_price = yf.Ticker(symbol).history(period='1d').Close.iloc[-1] # Get the latest closing price

        response_data = {
            'price': round(stock_price, 2)
        }

        return Response(response_data, status=HTTP_200_OK)
    


# class GetStockPrices(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, symbol):
#         cache_key = f'stock_data_{symbol}' # Unique identifier key for each symbol
#         data = cache.get(cache_key)  # try to get the data from the cache using the key
        
#         if data is None: # if data is not in the cache
#             # fetch fresh data from the stock API
#             stock_price = yf.Ticker(symbol).history(period='1d').Close.iloc[-1]
#             stock_name = yf.Ticker(symbol).info.get('longName', 'Unknown')
#             recent_datas = yf.download(symbol, period="1d", interval='5m')
#             times = recent_datas.index
#             values = recent_datas['Close']
#             data = [{"time": time.strftime('%H:%M'), "value": round(value, 2)} for time, value in zip(times, values)]
            
#             #store the fresh data in the cache with the unique key
#             cache.set(cache_key, {
#                 'name': stock_name,
#                 'price': round(stock_price, 2),
#                 'data': data,
#             }, timeout=30)  # Cache for 10 minutes for performance improvement

#         return Response(data, status=HTTP_200_OK)
    




class Watchlist(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            all_watchlist = WatchlistSerializer(request.user.stocks.order_by("created"), many=True)
            return Response(all_watchlist.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)
        

    def post(self, request):

        data = request.data.copy()

        data['owner'] = request.user.id

        ser_stock = WatchlistSerializer(data=data)

        if ser_stock.is_valid():
            ser_stock.save()
            return Response(ser_stock.data, status=HTTP_201_CREATED)
        else:
            print(ser_stock.errors)
            return Response(ser_stock.errors, status=HTTP_400_BAD_REQUEST)

class AWatchlist(APIView):
    permission_classes = [IsAuthenticated]

    def get_list(self, request, list_id):
        return get_object_or_404(request.user.stocks, id=list_id)


    def delete(self, request, list_id):
        curr_list = self.get_list(request, list_id)
        curr_list.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    

# class GetDataFrames(APIView)
    




