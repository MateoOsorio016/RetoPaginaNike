from django.utils import timezone
from django.db import models

# Create your models here.

class Product(models.Model):
    options= (
        ('shoes', 'Shoes'),
        ('shirt', 'Shirt'),
        ('hoodie', 'Hoodie'),
    )
    name= models.CharField(max_length=200)
    price= models.DecimalField(max_digits=10, decimal_places=2)
    quantity= models.IntegerField()
    description= models.TextField()
    category= models.CharField(max_length=50, choices=options)
    image= models.ImageField(upload_to='images_products/')
    state= models.BooleanField(default=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.updated_at= timezone.now()
        super(Product, self).save(*args, **kwargs)

