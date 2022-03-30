from django.test import SimpleTestCase as TestCase


class ProductsTestCase(TestCase):

    def setUp(self): 
        pass

    def tearDown(self):
        pass

    def test_getProducts(self):
        self.assertEqual(1, 1)
        