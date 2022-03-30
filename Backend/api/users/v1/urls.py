from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from .views import user, notification

app_name = 'api.users'


urlpatterns = [
    path('', user.getUsers, name='users'),
    path('login/', TokenObtainPairView.as_view(), name='token'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/', user.registerUser, name='register'),
    path('activate-account/<email_active_code>', user.ActivateAccountView.as_view(), name='activate_account'),
    path('profile/', user.getUserProfile, name='users-profile'),
    
    path('notifications/', notification.getNotifications, name='get-notifications'),
]
