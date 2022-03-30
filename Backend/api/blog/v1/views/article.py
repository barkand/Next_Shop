from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers.article import ArticlesSerializer, ArticleSerializer
from shop.views.article import *


routes = [
    '/articles/',
    '/article/<int:articleid>/',
    '/newarticles/',
]


@api_view(['GET'])
def getRoutes(request):
    return Response(routes)



@api_view(['GET'])
def getArticles(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    _context = {'lang': lang}

    _articles = get_articles()
    serializer = ArticlesSerializer(_articles, many=True, context=_context)
    return Response(serializer.data)


@api_view(['GET'])
def getArticle(request, articleid): 
    lang = request.META.get('HTTP_USER_LANG', 'en')
    _context = {'lang': lang}

    _article = get_article( articleid )
    serializer = ArticleSerializer(_article, many=False, context=_context)
    return Response(serializer.data)


# Products order by id desc
@api_view(['GET'])
def getNewArticles(request):
    lang = request.META.get('HTTP_USER_LANG', 'en')
    _context = {'lang': lang}

    _articles = get_new_articles()
    serializer = ArticlesSerializer(_articles, many=True, context=_context)
    return Response(serializer.data) 
