from django.shortcuts import render
import finnhub
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

load_dotenv()

class GetNews(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        api_key = os.getenv("NEWS_API_KEY")
        finnhub_client = finnhub.Client(api_key=api_key)
        
        try:

            news = finnhub_client.general_news('general', min_id=0)

            # get the last 5 news
            news = news[len(news) - 5:]
            
            data_response = []
            for n in news:
                data = {
                    "category": n['category'],
                    "headline": n['headline'],
                    "url": n['url'],
                    "image": n['image'],
                    "summary": n['summary']
                }

                data_response.append(data)

            return Response(data_response, status=HTTP_200_OK)

        except:
            return Response({"error": "No news"}, status=HTTP_400_BAD_REQUEST)