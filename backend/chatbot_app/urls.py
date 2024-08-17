from django.urls import path
from .views import ChatBot


urlpatterns = [
    path("chatbot/", ChatBot.as_view(), name="chatbot")
]