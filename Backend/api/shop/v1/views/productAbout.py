from rest_framework.decorators import api_view
from rest_framework.response import Response

from shop.views.productAbout import *
from ..serializers.productAbout import ProductAboutSerializer


routes = [
    '/productabout/<int:productid>/',
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)



@api_view(['GET'])
def getProductAbout(request, productid):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    
    _productAbout = get_productAbout(productid)
    serializer = ProductAboutSerializer(_productAbout, many=True, context={'lang': lang})
    return Response(serializer.data)
    