from django.shortcuts import render
import openai
import os
from dotenv import load_dotenv
from rest_framework import generics
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.response import Response
import json




