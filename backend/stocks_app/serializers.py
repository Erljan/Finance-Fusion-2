from rest_framework import serializers
from .models import StockWatchlist


class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockWatchlist
        fields = "__all__"

        