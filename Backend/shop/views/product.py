from shop.models.product import Product


def get_products(sort='-id'):
    return Product.objects.all().order_by(sort)

def get_product(productId):
    return Product.objects.get(id=productId)

def get_new_products():
    return Product.objects.filter(label__title='new', quantity__gt=0).order_by('-id')[:7]

def get_suggest_products(subcategoryId):
    return Product.objects.filter(subcategory__id=subcategoryId).order_by('-id')[:7]

def get_product_Ids(productIds):
    return Product.objects.filter(id__in=productIds).order_by('-id')[:7]
