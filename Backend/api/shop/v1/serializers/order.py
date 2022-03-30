from rest_framework import serializers
from jalali_date import datetime2jalali

from shop.models.order import *
from .product import ProductsMinimalSerializer

class OrderSerializer(serializers.ModelSerializer):

    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj)

        data['updated_at'] = obj.updated_at.strftime('%b %d,%Y - %H:%M:%S') if lang == 'en' else datetime2jalali(obj.updated_at).strftime('%Y/%m/%d - %H:%M:%S')
        data['products'] = ProductsMinimalSerializer(obj.products, many=True, context={'lang': lang}).data

        return data

    class Meta:
        model = Order
        depth = 1
        fields = ('id', 'products', 'totalprice', 'status', 'updated_at')


class OrderAllSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('id', 'products')