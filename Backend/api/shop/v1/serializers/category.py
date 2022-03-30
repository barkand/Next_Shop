from shop.models.category import *
from .serializers import StaticEntitySerializer

class CategorySerializer(StaticEntitySerializer):    
    
    class Meta:
        model = Category
        fields = ('id', 'title', 'slug', 'description', 'image')
