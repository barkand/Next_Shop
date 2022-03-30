from django.db import models

from .models import EntityCommonInfo
from .brand import Brand
from .owner import Owner
from .subcategory import Subcategory
from .tag import Tag
from .label import Label

class Product(EntityCommonInfo):
    code = models.IntegerField(default=0)
    brand = models.ForeignKey(Brand, on_delete=models.SET_DEFAULT, default=Brand.default_key, related_name='products')
    owner = models.ForeignKey(Owner, on_delete=models.SET_DEFAULT, default=Owner.default_key, related_name='products')
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_DEFAULT, default=Subcategory.default_key, related_name='products')
    label= models.ForeignKey(Label, on_delete=models.SET_DEFAULT, default="", null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    offPrice = models.IntegerField(default=0)
    offDateTime = models.DateTimeField(blank=True, null=True)

    @property
    def offPercent(self):
        return ''
    
    @property
    def formatPrice(self):
        return ''
    
    @property
    def formatOffPrice(self):
        return ''
    

    def get_absolute_url(self):
        return f'/products/{self.id}/{self.slug}'

    def __str__(self):
        return f'{self.id}: {self.title_en}'
