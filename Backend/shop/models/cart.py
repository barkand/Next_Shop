from django.db import models
from django.contrib.auth.models import User

from .product import Product


class Cart(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    price = models.IntegerField(default=0)

