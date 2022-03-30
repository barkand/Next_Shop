from rest_framework import serializers
from shop.models.productAbout import *


class ProductAboutSerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj)

        data['content'] = obj.content_en if lang == 'en' else obj.content_fa

        return data

    class Meta:
        model = ProductAbout
        fields = ('id', 'content')
