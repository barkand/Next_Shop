from shop.models.category import Category


def get_categories():
    return Category.objects.all()

def get_category(categoryId):
    return Category.objects.get(id=categoryId)
