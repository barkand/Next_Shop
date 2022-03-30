from django.shortcuts import get_object_or_404

from shop.models.gallery import Gallery


def get_gallery(galleryId):
    return get_object_or_404(Gallery, id=galleryId)
    