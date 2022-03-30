from rest_framework.decorators import api_view;
from rest_framework.response import Response;


routes = [
    'products/',
    'product/<int:productid>/',
    'newproducts/',
    'suggestproducts/<int:productid>/',

    'favorites/',
    'favorite/check/<int:productid>/',
    'favorite/add/<int:productid>/<int:flag>/',

    'carts/',
    'cart/add/<int:productid>/<int:price>/',
    'cart/remove/<int:productid>/',
    'cart/delete/<int:productid>/',

    'notifications/',

    'productreviews/<int:productid>/',
    'productreview/add/<int:productid>/<int:rating>/<str:title>/<str:description>/',
    'productdetail/<int:productid>/', 
    'productabout/<int:productid>/', 
    'dproductdetail/<int:productid>/',
    
    'categories/',

    'orders/',
    'orders/all/'
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)
