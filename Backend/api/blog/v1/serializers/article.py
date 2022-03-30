from shop.models.article import *
from .serializers import EntitySerializer


class ArticlesSerializer(EntitySerializer):
    
    class Meta:
        model = Article
        fields = ('id', 'title', 'slug', 'description', 'image', 'tags', 'created_at')


class ArticleSerializer(EntitySerializer):

    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj)

        data['content'] = obj.content_en if lang == 'en' else obj.content_fa

        return data

    class Meta:
        depth = 1
        model = Article
        fields = ('id', 'title', 'slug', 'description', 'image', 'tags', 'created_at', 'content')