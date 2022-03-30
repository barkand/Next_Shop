from shop.models.article import Article


def get_articles():
    return Article.objects.filter(active=1).order_by('-created_at')


def get_article(articleid):
    return Article.objects.get(id=articleid, active=1)

def get_new_articles():
    return Article.objects.order_by('-id')[:7]
    