from django.shortcuts import render
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import Category
from .serializers import CategorySerializer
from .pagination import CategoryPageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.


def get_category(pk):
    try:
        return Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        raise Exception('Categoria no encontrada')
    

class CategoryList(APIView):
    "API para listar categorias"
    permission_classes = [IsAuthenticated]
    def get(self, request):
        query= request.query_params.get('search', None)
        if query is not None:
            categories= Category.objects.filter(
                Q(name__icontains=query)
            )
        else:
            categories= Category.objects.all()

        paginator= CategoryPageNumberPagination()
        page= paginator.paginate_queryset(categories, request)
        if page is not None:
            serializer= CategorySerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        else: 
            serializer= CategorySerializer(categories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    
class CategoryRetrieve(APIView):
    "API para obtener una categoria"
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            category= Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Categoria no encontrada'})
        
        serializer= CategorySerializer(category)
        return Response(serializer.data)
    
class CategoryActive(APIView):
    "API para listar categorias activas"
    permission_classes = [IsAuthenticated]
    def get(self, request):
        categories= Category.objects.filter(state=True)
        serializer= CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
class CategoryCreate(APIView):
    "API para crear una categoria"
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer= CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CategoryUpdate(APIView):
    "API para actualizar una categoria"
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        category= get_category(pk)
        serializer= CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CategoryDelete(APIView):
    "API para eliminar una categoria"
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        try:
            category= get_object_or_404(Category, pk=pk)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'Categoria no encontrada'})
        
        category.state= not category.state
        category.save()
        serializer= CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)



