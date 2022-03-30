from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response;
from rest_framework.permissions import IsAuthenticated;

from shop.views.order import get_Orders, get_All_Orders
from ..serializers.order import OrderSerializer, OrderAllSerializer


routes = [
    '/orders/',
]

@api_view(['GET'])
def getRoutes(request):
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    user = request.user
    
    _orders = get_Orders(user)
    serializer = OrderSerializer(_orders, many=True, context={'lang': lang})
    return Response(serializer.data)


@api_view(['GET'])
def getAllOrders(request):  
    _orders = get_All_Orders()
    serializer = OrderAllSerializer(_orders, many=True)
    return Response(serializer.data)
