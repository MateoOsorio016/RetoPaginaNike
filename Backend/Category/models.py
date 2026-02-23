from django.db import models

# Create your models here.

class Category(models.Model):
    name= models.CharField(max_length=100)
    description= models.CharField(max_length=200)
    state= models.BooleanField(default=True)
    created_at= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name= 'Categoria'
        verbose_name_plural= 'Categorias'
        db_table= 'categories'
        ordering= ['id']

    def __str__(self):
        return self.name
