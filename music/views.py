from music.NEMbox.api import NetEase
from django.http import  HttpResponseRedirect,HttpResponse
from django.shortcuts import render
from music.models import Songlist
def song_list(request):
    song_list = Songlist.objects.all()
    return render(request, "song_list.html", context={"song_list": song_list})