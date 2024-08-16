from django.shortcuts import render, get_object_or_404
from .serializers import BudgetSerializer, TransactionSerializer
from .models import Budget, Transaction
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED,HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.exceptions import ValidationError


class AddOrGetTransactions(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(owner=user).order_by('-created')

    def perform_create(self, serializer):
        transaction = serializer.save(owner=self.request.user)

        # update the budget
        budget = Budget.objects.filter(owner=self.request.user).first()
        if budget:
            new_amount = budget.budgetAmt - transaction.amount
            if new_amount < 0:
                return Response({'error: Insufficient funds'}, status=HTTP_400_BAD_REQUEST)
                
            budget.budgetAmt = new_amount
            budget.save()


class DeleteTransaction(generics.DestroyAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        transaction = Transaction.objects.filter(owner=user)
        # print(f"User: {user}, Transaction: {transaction}")
        return transaction
    

    def perform_destroy(self, instance):
        # get the curr budget of the user
        budget = Budget.objects.filter(owner=self.request.user).first()

        if budget:
            # add the amount back to the budget
            budget.budgetAmt += instance.amount
            budget.save()
        else:
            print("Budget not found")

        instance.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    


class UpdateTransaction(generics.UpdateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        old_amount = instance.amount
        updated_transaction = serializer.save()

        # get the curr budget of the user
        budget = Budget.objects.filter(owner=self.request.user).first()

        if budget:
            # update the budget amount
            new_amount = updated_transaction.amount
            budget.budgetAmt += old_amount - new_amount
            if budget.budgetAmt < 0:
                raise ValueError("Insuffient funds")
            budget.save()

        else:
            raise ValueError("Budget not found")
    

class AddBudget(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def get_queryset(self):
        return Budget.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)





class UpdateBudgetAmount(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def get_queryset(self):
        # Get the budget of the current user
        return Budget.objects.filter(owner=self.request.user)

    def perform_update(self, serializer):
        try:
            # Access the current instance being updated
            budget = serializer.instance
            
            # Get the new budget amount from validated data or use the existing amount
            new_budget_amount = serializer.validated_data.get('budgetAmt', budget.budgetAmt)

            if new_budget_amount < 0:
                raise ValidationError("Budget amount cannot be negative")

            # Update the budget amount
            serializer.save(budgetAmt=new_budget_amount)

        except Exception as e:
            print(f"Error updating budget: {str(e)}")
            raise ValidationError("An error occurred while updating the budget.")