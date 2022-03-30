from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response;
from rest_framework.permissions import IsAuthenticated;

from shop.views.favorite import *;
from ..serializers.serializers import *;
from ..serializers.product import *;


routes = [
    '/favorites/',
    '/favorite/check/<int:productid>/',
    '/favorite/add/<int:productid>/<int:flag>/',
]

@api_view(['GET'])
def getRoutes(request):
    return Response(routes)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFavorites(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    user = request.user
    _context = {'lang': lang}
    
    _products = get_favorites(user)
    serializer = ProductsSerializer(_products, many=True, context=_context)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkFavorite(request, productid): 
    user = request.user

    value = check_favorite( user, productid )
    return Response({"favorite": value})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addToFavorite(request, productid, flag): 
    user = request.user

    add_to_favorite( user, productid, flag )
    return Response({"status": "ok"})
    