from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.models import Group
from django.utils.crypto import get_random_string
from django.utils import timezone
from datetime import timedelta



# Create your models here.
# Modelo de grupo personalizado
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
# Función para crear un superusuario
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
# Modelo de usuario personalizado
class CustomUser(AbstractUser):
    address= models.CharField(max_length=200)
    phone= models.CharField(max_length=15)
    birthdate= models.DateField(null=True, blank=True)
    group= models.ForeignKey(Group, on_delete=models.CASCADE)
    created_at= models.DateTimeField(auto_now_add=True)
    reset_password_token = models.CharField(max_length=200, blank=True, null=True)
    reset_password_token_expires_at = models.DateTimeField(blank=True, null=True)
    objects= CustomUserManager()

    REQUIRED_FIELDS= ['first_name', 'last_name', 'address', 'phone', 'birthdate', 'email', 'group']

    class Meta:
        verbose_name= 'Usuario'
        verbose_name_plural= 'Usuarios'
        db_table= 'users'
        ordering= ['id']
        
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'.title()
    
    # Función para crear un token de reseteo de contraseña
    def create_reset_token(self):
        if not self.reset_password_token or self.reset_password_token_expires_at < timezone.now():
            self.reset_password_token= get_random_string(50)
            self.reset_password_token_expires_at = timezone.now() + timedelta(hours=1)
            self.save()
        else:
            pass
    