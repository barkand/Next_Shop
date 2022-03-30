from django.urls import path

from .views import article as article_views, getRoutes
    

app_name = 'api.blog'


urlpatterns = [
    path('', getRoutes),
    path('articles/', article_views.getArticles, name='get-articles'),
    path('article/<int:articleid>/', article_views.getArticle, name='get-article'),
    path('newarticles/', article_views.getNewArticles, name='get-newarticles'),
]

