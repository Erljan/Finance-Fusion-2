from django.shortcuts import render
import yfinance as yf
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.permissions import IsAuthenticated


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