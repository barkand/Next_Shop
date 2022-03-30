from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('shop/', include('api.shop.urls')),
    path('blog/', include('api.blog.urls')),
    path('users/', include('api.users.urls')),
]
