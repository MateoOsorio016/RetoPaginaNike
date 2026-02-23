from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views


urlpatterns = [
    path('login', views.UserLoginView.as_view()),
    path('register', views.registerUserView.as_view()),
    path('profile', views.profileView.as_view()),
    path('get_users', views.GetUsersView.as_view()),
    path('get_user/<int:pk>', views.get_user.as_view()),
    path('update_user/<int:pk>', views.userUpdateView.as_view()),
    path('delete_user/<int:pk>', views.UserDeleteView.as_view()),
    path('users/reset_password', views.UserResetPasswordView.as_view()),
    path('users/reset_password_confirm/', views.UserResetPasswordConfirmView.as_view()),
    path('users/verify_token/<str:token>', views.VerifyResetToken.as_view()),
    path('users/groups', views.GroupListView.as_view()),
    path('UsersExcel', views.UsersExcel.as_view()),
]
