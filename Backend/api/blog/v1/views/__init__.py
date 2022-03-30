from rest_framework.decorators import api_view;
from rest_framework.response import Response;


routes = [
    'articles/',
    'article/<int:articleid>/',
    'newarticles/', 
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)
