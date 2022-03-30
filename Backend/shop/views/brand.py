from shop.models.brand import Brand


def get_brands():
    return Brand.objects.all()

def get_brand(brandId):
    return Brand.objects.get(id=brandId)
