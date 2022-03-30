from django.db import models
from .product import Product


class ProductAbout(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    content_en = models.TextField(blank=True, default='')
    content_fa = models.TextField(blank=True, default='')
    
    @property
    def content(self):
        return ''

    class Meta:
        verbose_name = 'Product_About'
