from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Transaction(models.Model):
    transac_name = models.CharField(max_length=20, default="Unknown")
    category = models.CharField(max_length=20, default="Unknown")
    amount = models.DecimalField(max_digits=10,decimal_places=2, default=0.00)
    created = models.DateTimeField(default=datetime.now)
    owner = models.ForeignKey(User, related_name="transactions", on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.transac_name} - {self.created.strftime('%m-%d-%Y')}"



class Budget(models.Model):
    owner = models.OneToOneField(User, related_name="budget", on_delete=models.CASCADE)
    budgetAmt = models.DecimalField(max_digits=10,decimal_places=2, default=0.00)


    




# {"transac_name": "Netflix", "category":"Entertainment", "amount": 10.00, "owner": 1}
# "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzNTY1NjQ0LCJpYXQiOjE3MjM1NjM4NDQsImp0aSI6ImJjYWVlZDUzMzQwNTQ3ZjRhNDAxYWQzNzlhNWIyNjZlIiwidXNlcl9pZCI6Nn0.hhuyFtq4zo-LbZfshmi_ye5nQJs5PhMhUKrc-ScQwwc"