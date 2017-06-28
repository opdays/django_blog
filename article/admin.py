from django.contrib import admin
from django.db import models
from .models import Article,Tag,FriendLink,Praise
# Register your models here.
from pagedown.widgets import AdminPagedownWidget

class MembershipInline(admin.TabularInline):
    """
    多对多admin模型设置
    http://python.usyiyi.cn/translate/django_182/ref/contrib/admin/index.html
    """
    model = Tag.articles.through



# class MyWidget(forms.Textarea):
#     class Media:
#         css = {
#             "all": ("/static/root/summernote/dist/summernote.css",),
#         }
#         js = (
#             "/static/root/lib/wangEditor/dist/js/lib/jquery-2.2.1.js",
#             "/static/root/summernote/dist/summernote.js",
#             "/static/root/summernote/summernote_init.js",
#         )



class ArticleAdmin(admin.ModelAdmin):
    #form = ArticleForm
    inlines = [
        MembershipInline,
    ]
    # https://github.com/timmyomahony/django-pagedown
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget(show_preview=False)},
        # models.TextField: {'widget': MyWidget(attrs={'id':'summernote'})},
    }


# class ArticleAdmin(SummernoteModelAdmin):
#     #form = ArticleForm
#     inlines = [
#         MembershipInline,
#     ]
#     # https://github.com/timmyomahony/django-pagedown
#     formfield_overrides = {
#         # models.TextField: {'widget': AdminPagedownWidget(show_preview=False)},
#         models.TextField: {'widget': SummernoteInplaceWidget()},
#     }

class TagAdmin(admin.ModelAdmin):
    inlines = [
        MembershipInline,
    ]
    exclude = ('articles',) #排除掉自带的article
admin.site.register(Article,ArticleAdmin)
admin.site.register(Tag,TagAdmin)

admin.site.register(FriendLink)
admin.site.register(Praise)