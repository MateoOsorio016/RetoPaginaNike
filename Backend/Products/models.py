from django.db import models

# Create your models here.

class Product(models.Model):
    options= (
        ('Zapatos', 'Zapatos'),
        ('Camisas', 'Camisas'),
        ('Buzos', 'Buzos'),
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

    class Meta:
        verbose_name= 'Product'
        verbose_name_plural= 'Products'
        db_table= 'products'


    def __str__(self):
        return f'{self.name} - {self.category}'.title()
    
    


