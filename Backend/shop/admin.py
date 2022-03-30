from django.contrib import admin

from .models.category import *
from .models.subcategory import *
from .models.tag import *
from .models.gallery import *
from .models.brand import *
from .models.owner import *
from .models.product import *
from .models.notification import *
from .models.favorite import *
from .models.cart import *
from .models.profile import *
from .models.productReview import *
from .models.productDetail import *
from .models.productAbout import *
from .models.label import *
from .models.article import *
from .models.status import *
from .models.order import *


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_en', 'slug', 'subcategory', 'quantity', 'price', 'offPrice', 'label', 'active', 'created_at')
    list_editable = ('title_en', 'quantity', 'price', 'offPrice', 'label', 'active')
    list_filter = ('subcategory', 'brand', 'label')
    search_fields = ('title_en', 'subcategory__category__title_en', 'subcategory__title_en')
    list_per_page = 25
    prepopulated_fields = {
        'slug':['title_en']
    }

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_en', 'slug', 'active', 'created_at')
    list_editable = ['title_en', 'active']

class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_en', 'slug', 'active', 'created_at')
    list_editable = ['title_en', 'active']

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_en', 'slug', 'active', 'created_at')
    list_editable = ['title_en', 'active']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_en', 'slug', 'active', 'created_at')
    list_editable = ['title_en', 'active']

class OwnerAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_en', 'slug', 'active', 'created_at')
    list_editable = ['title_en', 'active']

class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product')

class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'quantity', 'price')

class ProductAboutAdmin(admin.ModelAdmin):
    list_display = ('id', 'product')

class ProductDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'detail')

class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'status', 'created_at')
    list_editable = ['status']

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'totalprice', 'status')
    list_editable = ['totalprice', 'status']



# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory, SubcategoryAdmin)
admin.site.register(Tag)
admin.site.register(Gallery)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Owner, OwnerAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Notification)
admin.site.register(Favorite, FavoriteAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(Profile)
admin.site.register(ProductReview, ProductReviewAdmin)
admin.site.register(Detail)
admin.site.register(ProductDetail, ProductDetailAdmin)
admin.site.register(ProductAbout, ProductAboutAdmin)
admin.site.register(Label)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Status)
admin.site.register(Order, OrderAdmin)
