from django.urls import path
from . import views
from Category import views

urlpatterns = [
    path('category/list', views.CategoryList.as_view()),
    path('category/list/active', views.CategoryActive.as_view()),
    path('category/create', views.CategoryCreate.as_view()),
    path('category/update/<int:pk>', views.CategoryUpdate.as_view()),
    path('category/delete/<int:pk>', views.CategoryDelete.as_view()),
    path('category/retrieve/<int:pk>', views.CategoryRetrieve.as_view()),
]


