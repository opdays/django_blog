from django.contrib import admin
from .models import Article,Tag,FriendLink
# Register your models here.


class MembershipInline(admin.TabularInline):
    """
    多对多admin模型设置
    http://python.usyiyi.cn/translate/django_182/ref/contrib/admin/index.html
    """
    model = Tag.articles.through


class ArticleAdmin(admin.ModelAdmin):
    inlines = [
        MembershipInline,
    ]
class TagAdmin(admin.ModelAdmin):
    inlines = [
        MembershipInline,
    ]
    exclude = ('articles',) #排除掉自带的article
admin.site.register(Article,ArticleAdmin)
admin.site.register(Tag,TagAdmin)

admin.site.register(FriendLink)