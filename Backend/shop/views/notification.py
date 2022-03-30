from shop.models.notification import Notification


def get_notifications():
    return Notification.objects.all().order_by('-created_at')[:5]
    