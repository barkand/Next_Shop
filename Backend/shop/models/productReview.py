from django.db import models
from django.contrib.auth.models import User

from .models import CommonInfo
from .product import Product
from .status import Status


class ProductReview(CommonInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=5)
    status = models.ForeignKey(Status, on_delete=models.DO_NOTHING, default=2, null=True)
    

    class Meta:
        verbose_name = 'Product_Review'
