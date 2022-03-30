from shop.models.subcategory import *
from .category import CategorySerializer
from .serializers import StaticEntitySerializer


class SubcategorySerializer(StaticEntitySerializer):    
    category = CategorySerializer(many=False, read_only=True)      

    class Meta:
        model = Subcategory
        depth = 1
        fields = ('id', 'title', 'description', 'image', 'category')
