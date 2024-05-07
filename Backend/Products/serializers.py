from rest_framework import serializers
from .models import Product


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'quantity', 'description', 'category', 'image')

    def validate(self, data):
        if 'quantity' in data and data['quantity'] < 0:
            raise serializers.ValidationError({"quantity": 'La cantidad no puede ser negativa.'})
        if 'price' in data and data['price'] < 0:
            raise serializers.ValidationError({"price": 'El precio no puede ser negativo.'})
        
        return data