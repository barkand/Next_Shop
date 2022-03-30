from shop.models.product import Product
from shop.models.productReview import ProductReview


def get_productReviews(productId):
    return ProductReview.objects.filter(product=productId, status=1).prefetch_related('user')


def add_productReview( user, productId, rating, title, description ):
    product = Product.objects.get(id=productId)

    ProductReview.objects.create( user=user, product=product, rating=rating, description=description, title=title )
