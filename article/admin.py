from django.contrib import admin
from .models import Article,Tag,FriendLink
# Register your models here.

admin.site.register(Article)
admin.site.register(Tag)

admin.site.register(FriendLink)