from rest_framework.decorators import api_view;
from rest_framework.response import Response;


routes = [
    '/v1',
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)
