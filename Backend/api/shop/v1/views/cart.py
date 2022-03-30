from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response;
from rest_framework.permissions import IsAuthenticated;

from shop.views.cart import *;
from ..serializers.product import ProductsMinimalSerializer;

routes = [
    '/cart/<str:productids>',
    '/cart/add/<int:productid>/<int:price>/',
    '/cart/remove/<int:productid>/',
    '/cart/delete/<int:productid>',
]

@api_view(['GET'])
def getRoutes(request):
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCart(request, productids):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    user = request.user
    
    _products = get_cart(user, productids)
    
    serializer = ProductsMinimalSerializer(_products, many=True, context={'lang': lang})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCart(request, productid, price): 
    user = request.user

    add_cart( user, productid, price )
    return Response({"status": "ok"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeCart(request, productid): 
    user = request.user

    remove_cart( user, productid )
    return Response({"status": "ok"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeAllCart(request, productid): 
    user = request.user

    remove_all_cart( user, productid )
    return Response({"status": "ok"})
