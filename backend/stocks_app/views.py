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


# Get the stock name and price

class GetStock(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, symbol):
        stock_price = yf.Ticker(symbol).history(period='1d').Close

        stock_name = yf.Ticker(symbol).info['longName']

        response_data = {
            'name': stock_name,
            'price': round(stock_price, 2)
        }

        return Response(response_data, status=HTTP_200_OK)
    

# class Stocks(generics.ListCreateAPIView):

#     serializer_class = WatchlistSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # print("hello")
#         user = self.request.user
#         return StockWatchlist.objects.filter(owner=user)

#     def perform_create(self, serializer):
#         # if serializer.is_valid():
#         serializer.save(owner=self.request.user)
#         # else:
#         #     print(serializer.error)

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
    




