from django.contrib import admin
from django.db import models
from .models import Article,Tag,FriendLink,Praise
# Register your models here.
from pagedown.widgets import AdminPagedownWidget
from .form import ArticleForm

class MembershipInline(admin.TabularInline):
    """
    多对多admin模型设置
    http://python.usyiyi.cn/translate/django_182/ref/contrib/admin/index.html
    """
    model = Tag.articles.through


class ArticleAdmin(admin.ModelAdmin):
    #form = ArticleForm
    inlines = [
        MembershipInline,
    ]
    # https://github.com/timmyomahony/django-pagedown
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget(show_preview=False)},
    }
class TagAdmin(admin.ModelAdmin):
    inlines = [
        MembershipInline,
    ]
    exclude = ('articles',) #排除掉自带的article
admin.site.register(Article,ArticleAdmin)
admin.site.register(Tag,TagAdmin)

admin.site.register(FriendLink)
admin.site.register(Praise)