from django.shortcuts import render
from rest_framework import viewsets
from .models import Product
from .serializers import ProductsSerializer

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductsSerializer
    queryset = Product.objects.all()



