from django.urls import path, include
from rest_framework import routers
from . import views
from Products import views


urlpatterns = [
    path('products/list', views.ProductsList.as_view()),
    path('products/list/active', views.ProductListActive.as_view()),
    path('products/create', views.ProductCreate.as_view()),
    path('products/update/<int:pk>', views.ProductUpdate.as_view()),
    path('products/delete/<int:pk>', views.ProductDelete.as_view()),
    path('products/retrieve/<int:pk>', views.ProductRetrieve.as_view()),
    path('productsExport', views.ProductExport.as_view()),
]
