from django.db import models
from Category.models import Category
# Create your models here.

class Product(models.Model):
    name= models.CharField(max_length=200)
    price= models.DecimalField(max_digits=10, decimal_places=2)
    quantity= models.IntegerField()
    description= models.TextField()
    category= models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    image= models.ImageField(upload_to='images_products/' , null=True, blank=True)
    state= models.BooleanField(default=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name= 'Product'
        verbose_name_plural= 'Products'
        db_table= 'products'
        ordering= ['id']


    def __str__(self):
        return f'{self.name} - {self.category}'.title()
    
    

