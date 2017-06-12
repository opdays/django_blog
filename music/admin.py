from django.contrib import admin

# Register your models here.

from .models import Playlist,Artistlist

admin.site.register(Playlist)
admin.site.register(Artistlist)