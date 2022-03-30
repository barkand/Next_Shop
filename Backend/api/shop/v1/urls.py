from django.urls import path

from .views import getRoutes, \
    product as product_views, \
    favorite as favorite_views, \
    cart as cart_views, \
    productDetail as productDetail_views, \
    productAbout as productAbout_views, \
    productReview as productReview_views, \
    category as category_views, \
    order as order_views
    

app_name = 'api.shop'


urlpatterns = [
    path('', getRoutes),

    path('products/', product_views.getProducts, name='get-products'),
    path('product/<int:productid>/', product_views.getProduct, name='get-product'),
    path('newproducts/', product_views.getNewProducts, name='get-newproducts'),
    path('suggestproducts/<int:subcategoryid>/',product_views.getSuggestProducts, name='get-suggestproducts'),
    path('recommendproducts/<str:productids>/',product_views.getRecommendProducts, name='get-recommenderproducts'),

    path('favorites/', favorite_views.getFavorites, name='get-favorites'),
    path('favorite/check/<int:productid>/', favorite_views.checkFavorite, name='check-favorite'),
    path('favorite/add/<int:productid>/<int:flag>/',favorite_views.addToFavorite, name='add-to-favorite'),

    path('cart/<str:productids>/', cart_views.getCart, name='get-cart'),
    path('cart/add/<int:productid>/<int:price>/', cart_views.addCart, name='add-cart'),
    path('cart/remove/<int:productid>/', cart_views.removeCart, name='remove-cart'),
    path('cart/delete/<int:productid>/', cart_views.removeAllCart, name='remove-all-cart'),

    path('productreviews/<int:productid>/', productReview_views.getProductReviews, name='get-reviews'),
    path('productreview/add/<int:productid>/<int:rating>/<str:title>/<str:description>/',productReview_views.addProductReview, name='add-review'),
    path('productdetail/<int:productid>/', productDetail_views.getProductDetail, name='get-productDetail'),
    path('productabout/<int:productid>/', productAbout_views.getProductAbout, name='get-productAbout'),
    path('dproductdetail/<int:productid>/', product_views.getdynamicDetail, name='ge-DynamicDetail'),
    
    path('categories/', category_views.getCategories, name='get-categories'),

    path('orders/', order_views.getOrders, name='get-orders'),
    path('orders/all/', order_views.getAllOrders, name='get-all-orders'),
]
