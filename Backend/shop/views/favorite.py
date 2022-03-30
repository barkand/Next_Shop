from shop.models.product import  Product
from shop.models.favorite import Favorite


def get_favorites(user):
    return Product.objects.filter( favorite__user=user )
    

def check_favorite(user, productId):
    try:
        Favorite.objects.get( user=user, product=productId)
        return True
    except Favorite.DoesNotExist:
        return False
        

def add_to_favorite( user, productId, flag ):
    cnt = Favorite.objects.filter( user=user, product=productId ).count()
    if flag == 1 and cnt == 0:
        product = Product.objects.get(id=productId)
        Favorite.objects.create( user=user, product=product )

    if flag == 0 and cnt > 0:
        Favorite.objects.filter( user=user, product=productId ).delete()
