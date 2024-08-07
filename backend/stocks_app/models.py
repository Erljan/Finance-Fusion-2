from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
# from django.utils.timezone import now


class StockWatchlist(models.Model):
    symbol = models.CharField(max_length=4)
    stock_name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stocks")
    created = models.DateTimeField(blank=True, default=datetime.now)

    def __str__(self):
        return self.stock_name