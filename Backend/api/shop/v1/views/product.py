from rest_framework.decorators import api_view;
from rest_framework.response import Response;
from django.core.paginator import Paginator
from django.db.models import Q, Min, Max, Avg

from shop.views.product import *
from ..serializers.product import ProductSerializer, ProductsSerializer, ProductsMinimalSerializer
from ..methods import convertor
from . import brand
from . import ml

from logs import get_logger
logger = get_logger(__name__)


routes = [
    '/products/',
    '/product/<int:id>/',
    '/newproducts/',
    '/dproductdetail/<int:productid>/',
    '/suggestproducts/<int:subcategoryid>/',
    '/recommenderproducts/<str:productids>/',
]

@api_view(['GET'])
def getRoutes(request):
    return Response(routes)



@api_view(['GET'])
def getProducts(request):
    # logger.debug(f"{request.META}")
    # logger.debug(f"{request.META.get('PATH_INFO')}?{request.META.get('QUERY_STRING')}")
    # logger.debug(f"lang:{request.META.get('HTTP_USER_LANG')}")
    # logger.debug(f"lang:{request.GET.get('lang')}")
   
    # lang = request.META.get('HTTP_USER_LANG', 'en')
    lang = request.GET.get('lang', 'en')
 
    # Sort
    sortList = {
        '0': '-id',
        '1': 'price',
        '2': '-price',
        # '3': '-rating',
    }
    sort = sortList[request.GET.get('sort') if request.GET.get('sort', '') != '' else '0']
    
    products = get_products(sort)

    # Details for init filter sidebar
    filterDetails = {}
    details = request.GET.get('d', '')
    if (details=='1'):
        #TODO: filter on Category
        price_min = products.aggregate(Min('price')).get('price__min')
        price_max = products.aggregate(Max('price')).get('price__max')
        filterDetails = {
            'brands': brand.getBrands(lang),
            'price_range': { \
                'price__min' : convertor.curr_price(lang, price_min), \
                'price__max' : convertor.curr_price(lang, price_max) },
        }

    # Search
    filter = request.GET.get('q', '')
    if ( filter != ''):
        products = products.filter(title_en__icontains=filter)

    #filter
    brands = request.GET.getlist('brand', ['']) 
    if brands != [''] and len(brands) > 0:
        products = products.filter(Q(brand__id__in=brands))

    price_range = request.GET.getlist('price', [''])
    if price_range != [''] and len(price_range) > 0:   
        products = products.filter(Q(price__lte=convertor.currb_price(lang, price_range[1])) & Q(price__gte=convertor.currb_price(lang, price_range[0])))

    onlyAvailable = request.GET.get('available', '')
    if onlyAvailable=='1':
        products = products.filter(Q(quantity__gt=0))

    justOffPrice = request.GET.get('offprice', '')
    if justOffPrice=='1':
        products = products.filter(Q(offPrice__gt=0))

    justcat = request.GET.get('category', '') 
    if justcat != '':
        products = products.filter(Q(subcategory__category__id=justcat))

    justsubcat = request.GET.get('subcategory', '')
    if justsubcat != '':
        products = products.filter(Q(subcategory__id=justsubcat))


    count =  products.count()

    # Pagination
    page = request.GET.get('page', '')
    if page != '':        
        productsPerPage = request.GET.get('perpage') if request.GET.get('perpage', '') != '' else 16
        paginator = Paginator (products, productsPerPage)
        products = paginator.get_page(page)
        count = paginator.count

    
    serializer = ProductsSerializer(products, many=True, context={'lang': lang})

    return Response({'count': count, 'products':serializer.data, 'details': filterDetails})


@api_view(['GET'])
def getProduct(request, productid): 
    lang = request.META.get('HTTP_USER_LANG', 'en')

    _product = get_product( productid )
    serializer = ProductSerializer( _product, many=False, context={'lang': lang})
    return Response(serializer.data)


# Products labeled "new"
@api_view(['GET'])
def getNewProducts(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')

    _products = get_new_products()
    serializer = ProductsSerializer(_products, many=True, context={'lang': lang})
    return Response(serializer.data) 


@api_view(['GET'])
def getSuggestProducts(request, subcategoryid):
    lang = request.META.get('HTTP_USER_LANG', 'en')

    _products = get_suggest_products(subcategoryid)
    serializer = ProductsMinimalSerializer(_products, many=True, context={'lang': lang})
    return Response(serializer.data) 


@api_view(['GET'])
def getRecommendProducts(request, productids):
    lang = request.META.get('HTTP_USER_LANG', 'en')
       
    recommendProductids = ml.getRecommenderProducts(productids)

    _products = get_product_Ids(recommendProductids)
    serializer = ProductsMinimalSerializer(_products, many=True, context={'lang': lang})
    return Response(serializer.data) 


@api_view(['GET'])
def getdynamicDetail(request, productid):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    
    _product = Product.objects.get(id=productid)
    _reviews = _product.reviews.all()

    price = convertor.curr_price(lang, _product.price )
    offPrice = convertor.curr_price(lang,  _product.offPrice)

    data = {
        'rating': _reviews.aggregate(Avg('rating')).get('rating__avg') if _reviews.exists() else 0,
        'ratingCount':_reviews.count(),
        'price': price,
        'offPrice': offPrice,
        'quantity': _product.quantity,
        'offPercent': convertor.off_percent(price, offPrice) if offPrice > 0 and price > 0 else '',
        'formatPrice': convertor.to_price(price) if price > 0 else "unavailable",
        'formatOffPrice':convertor.to_price(offPrice) if offPrice > 0 else 0
    }

    return Response(data)
