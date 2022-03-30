from django.urls import path
from django.urls.conf import include


urlpatterns = [
    path('v1/', include('api.users.v1.urls')),
]
