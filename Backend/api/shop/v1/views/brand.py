from shop.views.brand import get_brands
from ..serializers.brand import BrandSerializer


def getBrands(lang):
    _brands = get_brands()
    serializer = BrandSerializer(_brands, many=True, context={'lang': lang})
    return serializer.data
