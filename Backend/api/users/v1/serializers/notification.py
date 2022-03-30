from rest_framework import serializers
from shop.models.notification import *

class NotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notification
        fields = '__all__'
