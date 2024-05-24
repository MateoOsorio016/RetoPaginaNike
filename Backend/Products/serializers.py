from rest_framework import serializers
from .models import Product
from Category.models import Category


class ProductsSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'quantity', 'description', 'category', 'category_name' ,'image', 'state')

    def validate(self, data):
        if 'quantity' in data and data['quantity'] < 0:
            raise serializers.ValidationError({"quantity": 'La cantidad no puede ser negativa.'})
        if 'price' in data and data['price'] < 0:
            raise serializers.ValidationError({"price": 'El precio no puede ser negativo.'})
        
        return data
    
    def get_category_name(self, obj):
        if obj.category:
            return obj.category.name
        
        return None