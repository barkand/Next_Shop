from django.db.models.signals import pre_save
from django.contrib.auth.models import User



def updateUser(sender, instance, **kwargs):
    user = instance

    if user.email != "" and not user.is_staff:
        user.username = user.email



pre_save.connect(receiver=updateUser, sender=User)
