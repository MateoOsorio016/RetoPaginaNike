from django.urls import path, include, re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.CustomUserViewSet, 'users')

urlpatterns = [
    path('users/', include(router.urls)),
    re_path('login', views.UserLoginView.as_view()),
    re_path('register', views.registerUserView.as_view()),
    path('get_user/<int:pk>', views.get_user.as_view()),
    path('update_user/<int:pk>', views.userUpdateView.as_view()),
]
