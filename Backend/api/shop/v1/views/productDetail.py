from rest_framework.decorators import api_view
from rest_framework.response import Response

from shop.views.productDetail import *
from ..serializers.productDetail import ProductDetailSerializer



routes = [
    '/productdetail/<int:productid>/',
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)



@api_view(['GET'])
def getProductDetail(request, productid):
    _productDetail = get_productDetail(productid)
    serializer = ProductDetailSerializer(_productDetail, many=True)
    return Response(serializer.data)
    