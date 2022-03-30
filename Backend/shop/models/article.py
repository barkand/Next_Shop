from django.db import models
from django.contrib.auth.models import User

from .models import EntityCommonInfo
from .tag import Tag


class Article(EntityCommonInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_en = models.TextField(blank=True, default='')
    content_fa = models.TextField(blank=True, default='')
    tags = models.ManyToManyField(Tag, blank=True)

    @property
    def content(self):
        return ''
    
    
    def get_absolute_url(self):
        return f'/blog/{self.id}/{self.slug}'
