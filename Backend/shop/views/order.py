from shop.models.order import Order


def get_Orders(user):
    return Order.objects.filter(user=user)

def get_All_Orders():
    return Order.objects.all()
