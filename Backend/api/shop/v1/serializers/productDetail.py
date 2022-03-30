from rest_framework import serializers
from shop.models.productDetail import *


class ProductDetailSerializer(serializers.ModelSerializer):
    code = serializers.CharField(source='detail.title')

    class Meta:
        model = ProductDetail
        fields = ('id', 'code', 'value')
