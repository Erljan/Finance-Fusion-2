from django.urls import path
from .views import GetNews


urlpatterns = [
    path('news/', GetNews.as_view(), name="news")
]