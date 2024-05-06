from datetime import date
from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import CustomUser

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')
    

class CustomUserSerializer(serializers.ModelSerializer):
    group= serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    class Meta:
        model= CustomUser
        fields= ('username', 'first_name', 'last_name', 'address', 'phone' , 'birthdate', 'email', 'password', 'group')

    def validate_birthdate(self, value):
        hoy = date.today()
        edad = hoy.year - value.year - ((hoy.month, hoy.day) < (value.month, value.day))
        if edad < 18:
            raise serializers.ValidationError("Debes ser mayor de 18 años para registrarte.")
        return value
    
    def create (self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'address', 'phone', 'birthdate', 'email', 'group')

    def validate_birthdate(self, value):
        hoy = date.today()
        edad = hoy.year - value.year - ((hoy.month, hoy.day) < (value.month, value.day))
        if edad < 18:
            raise serializers.ValidationError("Debes ser mayor de 18 años para registrarte.")
        return value
    
    
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50, required=True)
    password = serializers.CharField(max_length=100, required=True, write_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None or password is None:
            raise serializers.ValidationError('Se requiere tanto el nombre de usuario como la contraseña.')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError('No se encontró un usuario con este correo electrónico.')
        
        if not user.check_password(password):
            raise serializers.ValidationError('La contraseña proporcionada es incorrecta.')

        if not user.is_active:
            raise serializers.ValidationError('Este usuario está inactivo.')

        data['email'] = user 
        return data

    