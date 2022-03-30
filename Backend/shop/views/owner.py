from shop.models.owner import Owner


def get_owners():
    return Owner.objects.all()

def get_owner(ownerId):
    return Owner.objects.get(id=ownerId)
