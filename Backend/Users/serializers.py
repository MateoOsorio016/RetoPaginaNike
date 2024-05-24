from datetime import date
from django.contrib.auth.models import Group, Permission
from rest_framework import serializers
from .models import CustomUser

# Serializador de grupo
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')

# Serializador de permisos
class PermisionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('name')
# Serializador de lista de permisos
class PermissionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('id', 'name',)
    
# Serializador de usuario personalizado
class CustomUserSerializer(serializers.ModelSerializer):
    group= GroupSerializer()
    class Meta:
        model= CustomUser
        fields= ['id', 'username', 'first_name', 'last_name', 'address', 'phone' , 'birthdate', 'email', 'password', 'group', 'is_active', 'is_staff', 'created_at']
        extra_kwargs = {
            'password': {'write_only': True}
        }

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
    
# Serializador de creación de usuario personalizado
class CustomUserCreateSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all())
    class Meta: 
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'address', 'phone', 'birthdate', 'email', 'password', 'group')


    def validate_birthdate(self, value):
        hoy = date.today()
        edad = hoy.year - value.year - ((hoy.month, hoy.day) < (value.month, value.day))
        if edad < 18:
            raise serializers.ValidationError("Debes ser mayor de 18 años para registrarte.")
        return value
    # Función sifrar la contraseña
    def create (self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    

# Serializador de actualización de usuario personalizado
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'address', 'phone', 'birthdate', 'email', 'group')

    def validate_birthdate(self, value):
        hoy = date.today()
        edad = hoy.year - value.year - ((hoy.month, hoy.day) < (value.month, value.day))
        if edad < 18:
            raise serializers.ValidationError("Debes ser mayor de 18 años para registrarte.")
        return value

# Serializador de inicio de sesión de usuario
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

# Serializador de cambio de contraseña de usuario
class UserPasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

# Serializador de restablecimiento de contraseña de usuario
class UserPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

# Serializador de confirmación de restablecimiento de contraseña de usuario
class UserPasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)