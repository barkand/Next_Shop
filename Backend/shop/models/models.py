from django.db import models
from django.utils.text import slugify
from datetime import datetime

class EntityCommonInfo(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    title_en = models.CharField(max_length=150)
    title_fa = models.CharField(max_length=150, null=True)
    slug = models.SlugField(null=False, blank=True, default='')
    description_en = models.CharField(max_length=250, blank=True)
    description_fa = models.CharField(max_length=250, blank=True, null=True)
    image = models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(default=datetime.now, blank=True, null=True)
    active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(default=datetime.now, blank=True)

    @property
    def title(self):
        return ''

    @property
    def description(self):
        return ''


    def __str__(self):
        return self.title_en

    
    def save(self, *args, **kwargs ):
        self.slug = slugify( self.title_en)
        super().save(*args, **kwargs)

        
    class Meta:
        abstract = True


class StaticEntityCommonInfo(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    title_en = models.CharField(max_length=150)
    title_fa = models.CharField(max_length=150, null=True)
    slug = models.SlugField(null=False, blank=True, default='')
    description_en = models.TextField(blank=True)
    description_fa = models.TextField(blank=True)
    image = models.TextField(blank=True)
    created_at = models.DateTimeField(default=datetime.now, blank=True, null=True)
    active = models.BooleanField(default=True)

    @property
    def title(self):
        return ''

    @property
    def description(self):
        return ''

        
    def __str__(self):
        return self.title_en
    
    def save(self, *args, **kwargs ):
        self.slug = slugify( self.title_en)
        super().save(*args, **kwargs)
        
    class Meta:
        abstract = True


class CommonInfo(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.title

    class Meta:
        abstract = True
