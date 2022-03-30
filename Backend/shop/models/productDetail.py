from django.db import models

from .product import Product


class Detail(models.Model):
    code = models.IntegerField()
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class ProductDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    detail = models.ForeignKey(Detail, on_delete=models.CASCADE)
    value = models.CharField(max_length=150, null=True, default="")
    
    class Meta:
        verbose_name = 'Product_Detail'
