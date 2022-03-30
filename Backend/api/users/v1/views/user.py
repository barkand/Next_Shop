from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from rest_framework import status

from ..serializers.user import UserSerializer, UserSerializerWithToken, ProfileSerializer
from shop.models.profile import Profile


from logs import get_logger
logger = get_logger(__name__)


routes = [
    '/login/',
    '/login/refresh/',
    '/register/',
    '/activate-account/<email_active_code>',
    '/profile/',
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)


class ActivateAccountView(TokenObtainPairView):
    def get(self, request, email_active_code):
        profile: Profile = Profile.objects.get(email_active_code__iexact=email_active_code)
        if profile is not None:
            if profile.active:
                return Response({"error": "EmailWasActived"},status=status.HTTP_200_OK)

            profile.email_active_code = get_random_string(length=72)
            profile.active = True
            profile.save()
            return Response({"message": "EmailActived"}, status=status.HTTP_200_OK)
        return Response({"error": "UserNotExist"}, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):    
    data = request.data
    email = data['email']
    password = data['password']

    user = User.objects.filter(email=email).first()

    if user is None:
        try:
            validate_password(password)
        except Exception as e:
            return Response({"error": "PasswordNotStrong"}, status=status.HTTP_200_OK)
        
        user = User.objects.create(
            first_name=email.split('@')[0],
            username=email,
            email=email,
            password=make_password(password)
        )

    elif not user.check_password(password):
        return Response({"error": "PasswordIsWrong"}, status=status.HTTP_200_OK)

    serializer = UserSerializerWithToken(user, many=False).data
    return Response(serializer, status=status.HTTP_200_OK)
 