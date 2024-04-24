from django.urls import path, include
from rest_framework import routers
from Products import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet, 'products')


urlpatterns = [
    path('products/', include(router.urls))
]
