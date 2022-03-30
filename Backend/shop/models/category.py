from .models import StaticEntityCommonInfo


class Category(StaticEntityCommonInfo):
    default_key = 1
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        