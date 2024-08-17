from django.shortcuts import render
from openai import OpenAI
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

import json


load_dotenv()

# client = OpenAI(api_key=os.getenv("API_KEY"))

class ChatBot(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # check the api key
        api_key=os.getenv("API_KEY")

        if not api_key:
            return Response({"error": "No API key"}, status=HTTP_400_BAD_REQUEST)
        
        client = OpenAI(api_key=api_key)

        message = request.data.get('message')

        if not message:
            return Response({"error": "No message"}, status=HTTP_400_BAD_REQUEST)

        try:
            messages = [{"role": "user", "content": message}]

            # crete the chat completion
            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages
            )

            # extract the response

            choices = completion.choices
            # print(choices[0].message.content)
            if choices:
                data_response = choices[0].message.content
                return Response({"response": data_response}, status=HTTP_200_OK)
            else:
                return Response({"error": "No choices"}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response({"error": "No response"}, status=HTTP_400_BAD_REQUEST)
        
