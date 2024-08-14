from rest_framework import serializers
from .models import Budget, Transaction
from datetime import datetime


class BudgetSerializer(serializers.ModelSerializer):
    # created = serializers.DateTimeField(format="%m-%d-%Y", read_only=True)

    class Meta:
        model = Budget
        fields = ['budgetAmt']



class TransactionSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%m-%d-%Y", read_only=True)

    class Meta:
        model = Transaction
        exclude = ['owner']