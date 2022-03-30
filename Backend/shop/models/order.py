from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

from .product import Product
from .status import Status


class Order(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, blank=True)
    totalprice = models.IntegerField(default=0)
    status = models.ForeignKey(Status, on_delete=models.DO_NOTHING, default=2, null=True)
    created_at = models.DateTimeField(default=datetime.now, blank=True, null=True)
    updated_at = models.DateTimeField(default=datetime.now, blank=True, null=True)

    def __str__(self):
        return f'{self.user}'
