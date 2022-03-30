from .models import CommonInfo


class Notification(CommonInfo):
    def __str__(self):
        return self.title
