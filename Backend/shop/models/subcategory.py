from django.db import models

from .models import StaticEntityCommonInfo
from .category import Category


class Subcategory(StaticEntityCommonInfo):
    default_key = 1
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Subcategory'
        verbose_name_plural = 'Subcategories'
        
    def __str__(self):
        return f'{self.category} >> {self.title_en}'