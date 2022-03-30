from rest_framework import serializers
from shop.models.cart import *


class CartSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cart
        fields = '__all__'