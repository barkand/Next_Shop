from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response;
from rest_framework.permissions import IsAuthenticated;

from shop.views.productReview import *
from ..serializers.productReview import ReviewSerializer


routes = [
    '/productreviews/<int:productid>/',
    '/productreview/add/<int:productid>/<int:number>/<str:title>/<str:text>/',
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)



@api_view(['GET'])
def getProductReviews(request, productid):
    _reviews = get_productReviews(productid)
    serializer = ReviewSerializer(_reviews, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProductReview(request, productid, rating, title, description): 
    user = request.user
    
    add_productReview( user, productid, rating, title, description )
    return Response({"status": "ok"})
