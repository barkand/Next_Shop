from django.db import models

from .models import CommonInfo
from .product import Product

class Gallery(CommonInfo):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = 'Gallery'
        verbose_name_plural = 'Galleries'
