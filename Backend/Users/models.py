from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.models import Group


# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, address, phone, birthdate, email, group, password=None):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        user= self.model(
            username= username,
            first_name= first_name,
            last_name= last_name,
            address= address,
            phone= phone,
            birthdate= birthdate,
            email= self.normalize_email(email),
            group= Group.objects.get(pk=group)
        )
        user.set_password(password)
        user.is_staff= False
        user.save()
        return user

    def create_superuser(self, username, first_name, last_name, address, phone, birthdate, email, group, password=None):
        user= self.create_user(
            username= username,
            first_name= first_name,
            last_name= last_name,
            address= address,
            phone= phone,
            birthdate= birthdate,
            email= email,
            group= Group.objects.get(pk=group),
            password= password
        )
        user.is_staff= True
        user.save(using=self._db)
        return user

class CustomUser(AbstractUser):
    address= models.CharField(max_length=200)
    phone= models.CharField(max_length=15)
    birthdate= models.DateField(null=True, blank=True)
    group= models.ForeignKey(Group, on_delete=models.CASCADE)
    created_at= models.DateTimeField(auto_now_add=True)
    objects= CustomUserManager()

    REQUIRED_FIELDS= ['first_name', 'last_name', 'address', 'phone', 'birthdate', 'email' , 'group']

    class Meta:
        verbose_name= 'Usuario'
        verbose_name_plural= 'Usuarios'
        db_table= 'users'
        
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'.title()
    

    
   