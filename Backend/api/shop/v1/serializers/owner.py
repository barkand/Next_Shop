from shop.models.owner import *
from .serializers import StaticEntitySerializer


class OwnerSerializer(StaticEntitySerializer):
    
    class Meta:
        model = Owner
        fields = ('id', 'title', 'image')
        