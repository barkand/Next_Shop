# from django.test import TestCase
from django.test import SimpleTestCase as TestCase
# from django.test import TransactionTestCase as TestCase

from shop.models.product import Product
from shop.models.brand import Brand
from shop.models.owner import Owner
from shop.models.subcategory import Subcategory


class ModelTest(TestCase):
    # databases = '__all__'

    def setUp(self): 
        # django.db.connections.close_all()
        pass


    def testProductModel(self):
        # brand = Brand.objects.get(pk=1)
        # owner = Owner.objects.get(pk=1)
        # subcategory = Subcategory.objects.get(pk=1)
        
        # product = Product.objects.create(title_en="item 33", price=800, brand=brand, owner=owner, subcategory=subcategory, quantity=1)
        # print(product)
        # self.assertEquals(str(product), 'item 33')
        pass
