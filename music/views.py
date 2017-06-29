from music.NEMbox.api import NetEase
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from music.models import Playlist, Artistlist
from requests import get
from django.core.cache import cache


# 此处搜索的内容和结果存入内存

def song_list(request):
    play_list = Playlist.objects.all()
    artist_list = Artistlist.objects.all()
    return render(request, "play_list.html", context={
        "play_list": play_list,
        "artist_list": artist_list
    })


def test(request):
    play_list = Playlist.objects.all()
    artist_list = Artistlist.objects.all()
    return render(request, "song_list.html", context={
        "play_list": play_list,
        "artist_list": artist_list
    })


def search(request):
    if request.method == "GET":
        key= cache.get("key")
        return render(request, "search.html", context={
                                                       "key": key,
                                                       })
    if request.method == "POST":
        key = request.POST.get("key")
        #response = get("http://opdays.com:8080/song/search", params={"key": key})
        #result = response.json()
        #length = len(result)
        cache_key = cache.get("key")
        if not cache_key:
            cache_key=[]
        cache_key.append(key)
        cache.set("key",cache_key,60 * 60)
        return render(request, "search.html", context={
                                                       "key": cache_key,
                                                       })
