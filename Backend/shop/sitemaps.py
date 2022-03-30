from itertools import product
from django.contrib.sitemaps import Sitemap
from .models.article import Article
from .models.product import Product

class ArticleSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        return Article.objects.filter(active=1)

    def lastmod(self, obj):
        return obj.created_at


class ProductSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        return Product.objects.filter(active=1)

    def lastmod(self, obj):
        return obj.created_at


sitemapItems = {
    'articles': ArticleSitemap,
    'products': ProductSitemap,
}
