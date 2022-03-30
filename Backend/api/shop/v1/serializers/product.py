from shop.models.product import *
from shop.models.productReview import *
from ..methods import convertor

from .serializers import EntitySerializer
from .subcategory import SubcategorySerializer
from .brand import BrandSerializer
from .owner import OwnerSerializer


class ProductsSerializer(EntitySerializer):
    subcategory = SubcategorySerializer(many=False, read_only=True)
    brand = BrandSerializer(many=False, read_only=True)
    owner = OwnerSerializer(many=False, read_only=True)

    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj) 

        price = convertor.curr_price(lang, obj.price )
        offPrice = convertor.curr_price(lang, obj.offPrice )

        data['price'] = price
        data['offPrice'] = offPrice

        # Format price
        data['offPercent'] = convertor.off_percent(price, offPrice) if offPrice > 0 and price > 0 else ''
        data['formatPrice'] = convertor.to_price(price) if price > 0 else "unavailable"
        data['formatOffPrice'] = convertor.to_price(offPrice) if offPrice > 0 else 0
        
        return data
    
    class Meta:
        model = Product
        depth = 1
        fields = ('id', 'title', 'slug', 'description', 'image', 'code', 'quantity', 'price', 'offPrice', 'offDateTime', 'brand', 'owner', 'subcategory' ,'label', 'tags', 'offPercent', 'formatPrice', 'formatOffPrice')


class ProductsMinimalSerializer(EntitySerializer):
   
    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj) 

        price = convertor.curr_price(lang, obj.price )
        offPrice = convertor.curr_price(lang, obj.offPrice )

        data['price'] = price 
        data['offPrice'] = offPrice

        # Format price
        data['offPercent'] = convertor.off_percent(price, offPrice) if offPrice > 0 and price > 0 else ''
        data['formatPrice'] = convertor.to_price(price) if price > 0 else "unavailable"
        data['formatOffPrice'] = convertor.to_price(offPrice) if offPrice > 0 else 0
        
        return data
    
    class Meta:
        model = Product
        fields = ('id', 'title', 'slug', 'description', 'image', 'code', 'quantity', 'price', 'offPrice', 'offDateTime', 'brand', 'owner', 'subcategory' ,'label', 'tags', 'offPercent', 'formatPrice', 'formatOffPrice')


class ProductSerializer(EntitySerializer):
    subcategory = SubcategorySerializer(many=False, read_only=True)
    brand = BrandSerializer(many=False, read_only=True)
    owner = OwnerSerializer(many=False, read_only=True)

    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj) 

        price = convertor.curr_price(lang, obj.price )
        offPrice = convertor.curr_price(lang, obj.offPrice )

        data['price']  = price
        data['offPrice'] = offPrice

        # Format price
        data['offPercent'] = convertor.off_percent(price, offPrice) if offPrice > 0 and price > 0 else ''
        data['formatPrice'] = convertor.to_price(price) if price > 0 else "unavailable"
        data['formatOffPrice'] = convertor.to_price(offPrice) if offPrice > 0 else 0
        

        return data 

    class Meta:
        model = Product
        depth = 2
        fields = ('id', 'title', 'slug', 'description', 'image', 'code', 'quantity', 'price', 'offPrice', 'offDateTime', 'brand', 'owner', 'subcategory' ,'label', 'tags', 'offPercent', 'formatPrice', 'formatOffPrice')
