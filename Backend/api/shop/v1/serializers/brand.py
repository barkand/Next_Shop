from shop.models.brand import *
from .serializers import StaticEntitySerializer

class BrandSerializer(StaticEntitySerializer):
    
    class Meta:
        model = Brand
        fields = ('id', 'title', 'image')