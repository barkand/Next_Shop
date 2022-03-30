from django.test import SimpleTestCase as TestCase

class UrlTestCase(TestCase):

    def setUp(self): 
        self.url = 'http://localhost:8000/'

    def tearDown(self):
        pass
    

    def test_HomePage(self):
        response = self.client.get(f'{self.url}api/')
        self.assertEqual(response.status_code, 200)

