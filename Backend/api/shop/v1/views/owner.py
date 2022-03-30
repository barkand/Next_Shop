from shop.views.owner import get_owners
from ..serializers.brand import BrandSerializer


def getOwners(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    _context = {'lang': lang}

    _owners = get_owners()
    serializer = BrandSerializer(_owners, many=True, context=_context)
    return serializer.data
