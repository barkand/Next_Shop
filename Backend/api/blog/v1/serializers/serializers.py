from rest_framework import serializers
from jalali_date import datetime2jalali


class EntitySerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        lang =  self.context.get('lang')
        data = super().to_representation(obj)

        data['title'] = obj.title_en if lang == 'en' else obj.title_fa
        data['description'] = obj.description_en if lang == 'en' else obj.description_fa
        data['created_at'] = obj.created_at.strftime('%b %d,%Y - %H:%M:%S') if lang == 'en' else datetime2jalali(obj.created_at).strftime('%Y/%m/%d - %H:%M:%S')
        data['updated_at'] = obj.updated_at.strftime('%b %d,%Y - %H:%M:%S') if lang == 'en' else datetime2jalali(obj.updated_at).strftime('%Y/%m/%d - %H:%M:%S')

        return data
        