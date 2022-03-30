
from django.db import models

class Status(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Statuses'
