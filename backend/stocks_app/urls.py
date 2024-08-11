from django.urls import path
from .views import GetStock, Watchlist, AWatchlist, GetStockPrices

urlpatterns = [
    path('stock/<str:symbol>/', GetStock.as_view(), name='get_stock'),
    path('stock/prices/<str:symbol>/', GetStockPrices.as_view(), name='get_stock'),
    path('stock/delete/<int:list_id>/', AWatchlist.as_view(), name='a-watchlist'),
    path('stock/', Watchlist.as_view(), name='watchlist'),
]