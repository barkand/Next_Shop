from rest_framework import serializers


class EntitySerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj)

        data['title'] = obj.title_en if lang == 'en' else obj.title_fa
        data['description'] = obj.description_en if lang == 'en' else obj.description_fa

        return data

class StaticEntitySerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj)

        data['title'] = obj.title_en if lang == 'en' else obj.title_fa
        data['description'] = obj.description_en if lang == 'en' else obj.description_fa

        return data