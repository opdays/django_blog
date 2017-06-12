from music.NEMbox.api import NetEase
from django.http import  HttpResponseRedirect,HttpResponse
from django.shortcuts import render
from music.models import Playlist,Artistlist
def song_list(request):
    play_list = Playlist.objects.all()
    artist_list = Artistlist.objects.all()
    return render(request, "play_list.html", context={
        "play_list": play_list,
        "artist_list":artist_list
    })