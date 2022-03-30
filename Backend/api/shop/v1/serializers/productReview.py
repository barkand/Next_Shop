from rest_framework import serializers

from shop.models.productReview import *


class ReviewSerializer(serializers.ModelSerializer):  
    user = serializers.CharField(source='user.get_full_name', read_only=True)
    image = serializers.CharField(source='user.profile.image', read_only=True)
    userid = serializers.CharField(source='user.profile.id', read_only=True)

    class Meta:
        model = ProductReview
        fields = ('id', 'product','description', 'rating', 'title', 'created_at', 'status', 'userid', 'user', 'image')
