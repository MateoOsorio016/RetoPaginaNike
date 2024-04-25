from django.urls import path, include, re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.CustomUserViewSet, 'users')

urlpatterns = [
    path('users/', include(router.urls)),
    re_path('login', views.login),
    re_path('register', views.register),
    re_path('get_user', views.get_user)
]
