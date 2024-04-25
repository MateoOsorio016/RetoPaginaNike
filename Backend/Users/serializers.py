from rest_framework import serializers
from .models import CustomUser
from datetime import date

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields= ('username', 'first_name', 'last_name', 'address', 'phone' , 'birthdate', 'email', 'password')

    def validate_birthdate(self, value):
        hoy = date.today()
        edad = hoy.year - value.year - ((hoy.month, hoy.day) < (value.month, value.day))
        if edad < 18:
            raise serializers.ValidationError("Debes ser mayor de 18 años para registrarte.")
        return value

