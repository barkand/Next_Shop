from shop.models.subcategory import Subcategory


def get_subCategories():
    return Subcategory.objects.all()

def get_subCategory(subCategoryId):
    return Subcategory.objects.get(id=subCategoryId)
    