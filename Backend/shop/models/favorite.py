from django.db import models
from django.contrib.auth.models import User

from .product import Product


class Favorite(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    
    class Meta:
        unique_together = ['user', 'product']
 