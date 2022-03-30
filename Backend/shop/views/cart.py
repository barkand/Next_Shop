from shop.models.product import Product
from shop.models.cart import Cart


def get_cart(user, productids = ""):
    if (productids != "" and productids != "0"):
        _cartids = Cart.objects.filter( user=user ).values('product__id')
        for productid in productids.split(','):
            if productid not in _cartids:
                product = Product.objects.get(id=productid)
                add_cart( user, product.id, product.price )
    
    return Product.objects.filter( id__in=Cart.objects.filter( user=user ).values('product__id') )
    
    
def add_cart( user, productId, price ):
    cnt = Cart.objects.filter( user=user, product=productId ).count()
    if cnt == 0:
        product = Product.objects.get(id=productId)
        Cart.objects.create( user=user, product=product, quantity=1, price=price )
    else:
        Cart.objects.filter( user=user, product=productId ).update( quantity=cnt+1, price=price )


def remove_cart( user, productId ):
    quantity = Cart.objects.filter( user=user, product=productId ).quantity
    if quantity == 1:
        Cart.objects.filter( user=user, product=productId ).delete()
    else:
        Cart.objects.filter( user=user, product=productId ).update( quantity=quantity-1 )


def remove_all_cart( user, productId ):
    Cart.objects.filter( user=user, product=productId ).delete()
