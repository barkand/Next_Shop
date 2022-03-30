from shop.models.productDetail import ProductDetail


def get_productDetail(productId):
    return ProductDetail.objects.filter(product=productId)
