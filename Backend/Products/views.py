from django.shortcuts import render
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.http import FileResponse
from django.core.paginator import Paginator
from django.db import transaction
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product
from .serializers import ProductsSerializer
from .pagination import ProductsPageNumberPagination
import os


# Create your views here.


def get_product(pk):
    try:
        return Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        raise Exception('Producto no encontrado')
    

class ProductsList(APIView):
    "API para listar productos"
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        page = request.query_params.get('page', 1)
        page = int(page)
        order = request.query_params.get('order', None)
        query = request.query_params.get('search', None)

        products = Product.objects.all()
        
        if query:
            products = Product.objects.filter(
                Q(name__icontains=query) |
                Q(price__icontains=query) |
                Q(quantity__icontains=query)
            )
        if order:
            order = order.lower()
            if order == 'asc':
                order_by = 'price'
            elif order == 'desc':
                order_by = '-price'
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Orden no válida'})
            products = products.order_by(order_by)

        paginator = Paginator(products, 5)
        page_products = paginator.get_page(page)
        serializer = ProductsSerializer(page_products, many=True)
        
        return Response({
            'products': serializer.data,
            'total_pages': paginator.num_pages,
            'current_page': page,
            'total_products': paginator.count
        }, status=status.HTTP_200_OK)
        
        
class ProductListActive(APIView):
    "API para listar productos activos"
    def get(self, request):
        products = Product.objects.filter(state=True)
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)
    


class ProductRetrieve(APIView):
    "API para obtener un producto"
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Producto no encontrado'})
        
        serializer = ProductsSerializer(product)
        return Response(serializer.data, )
    
class ProductCreate(APIView):
    "API para crear un producto"
    permission_classes = [IsAuthenticated]
    def post(self, request):
        with transaction.atomic():
            serializer = ProductsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductUpdate(APIView):
    "API para actualizar un producto"
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        with transaction.atomic():
            product = get_product(pk)
            serializer = ProductsSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductDelete(APIView):
    "API para eliminar un producto"
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        try: 
            product = get_object_or_404(Product, pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Producto no encontrado'})
        
        product.state = not product.state
        product.save()
        serializer = ProductsSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ProductExport(APIView):
    "API para exportar productos a un archivo csv"
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductsSerializer(products, many=True)
        df = pd.DataFrame(serializer.data)
        excel_file = 'products.xlsx'
        
        # convierte el dataframe a un archivo excel
        df.to_excel(excel_file, index=False, engine='openpyxl')
        
        # asegúrate de que el archivo se haya guardado correctamente antes de abrirlo
        if not os.path.exists(excel_file):
            return Response({'error': 'Error al generar el archivo Excel'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # abre el archivo excel
        response = FileResponse(open(excel_file, 'rb'))
        response['Content-Disposition'] = 'attachment; filename=products.xlsx'
        
        return response






