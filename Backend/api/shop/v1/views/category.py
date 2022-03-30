from rest_framework.decorators import api_view;
from rest_framework.response import Response;

from shop.views.category import get_categories
from ..serializers.category import *


routes = [
    '/categories/',
]

@api_view(['GET'])
def getRoutes(request):
    return Response(routes)



@api_view(['GET'])
def getCategories(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    
    _categories = get_categories()
    serializer = CategorySerializer(_categories, many=True, context={'lang': lang})
    return Response(serializer.data)
