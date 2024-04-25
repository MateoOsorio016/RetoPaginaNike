from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    address= models.CharField(max_length=200)
    phone= models.CharField(max_length=15)
    birthdate= models.DateField(null=True, blank=True)
    
   