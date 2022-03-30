from rest_framework.decorators import api_view;
from rest_framework.response import Response;

from shop.views.notification import get_notifications
from ..serializers.notification import NotificationSerializer


from logs import get_logger
logger = get_logger(__name__)


routes = [
    '/notifications/',
]

@api_view(['GET'])
def getRoutes(request):
    return Response(routes)


@api_view(['GET'])
def getNotifications(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    _context = {'lang': lang}

    _notification = get_notifications()
    serializer = NotificationSerializer(_notification, many=True, context=_context)
    return Response(serializer.data)
