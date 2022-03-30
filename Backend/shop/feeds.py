from django.contrib.syndication.views import Feed
from django.template.defaultfilters import truncatewords
from .models.article import Article

class ArticlesFeed(Feed):
    title = "blog"
    link = "/blog/"
    description = "New posts of blog."

    def items(self):
        return Article.objects.filter(active=1)
    
    def item_title(self, item):
        return item.title_en

    def item_description(self, item):
        return truncatewords(item.content, 30)
