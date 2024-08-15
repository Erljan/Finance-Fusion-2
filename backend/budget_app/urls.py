from django.urls import path
from .views import AddOrGetTransactions, DeleteTransaction, UpdateTransaction, UpdateBudgetAmount, AddBudget

urlpatterns = [
    path('budget/transactions/', AddOrGetTransactions.as_view(), name='add-list-transaction'),
    path('budget/transactions/<int:pk>/', DeleteTransaction.as_view(), name='delete-transaction'),
    path('budget/<int:pk>/update/transaction/', UpdateTransaction.as_view(), name='update-transaction'),
    path('budget/<int:pk>/', UpdateBudgetAmount.as_view(), name='update-budget'),
    path('budget/', AddBudget.as_view(), name='update-budget'),
]


# {"budgetAmt":100}
# {"transac_name": "Netflix", "category":"Entertainment", "amount":10}