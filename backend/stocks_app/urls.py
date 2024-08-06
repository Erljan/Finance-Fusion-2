from django.urls import path
from .views import GetStock

urlpatterns = [
    path('stock/<str:symbol>/', GetStock.as_view(), name='get_stock')
]