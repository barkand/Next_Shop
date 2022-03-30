from shop.models.productAbout import ProductAbout


def get_productAbout(productId):
    return ProductAbout.objects.filter(product=productId)
