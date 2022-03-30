from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.crypto import get_random_string
from utils.email_service import send_email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile = models.CharField(max_length=20, null=True, blank=True)
    image = models.ImageField(upload_to='media/users/', default='', blank=True, null=True) 
    email_active_code = models.CharField(max_length=72, default='')
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    @property
    def name(self):
        return f'{self.user.first_name} {self.user.last_name}'.strip()



@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        email_active_code = get_random_string(length=72)
        Profile.objects.create(user=instance, email_active_code= email_active_code)

        send_email('Activate account', instance.email, {'email_active_code': email_active_code}, 'emails/activate_account.html')



@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
