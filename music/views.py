from music.NEMbox.api import NetEase
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from music.models import Playlist, Artistlist
from requests import get
import datetime
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
        now= cache.get("now")
        key= cache.get("key")
        result= cache.get("result")
        length=cache.get("length")
        print(now,key,length)
        return render(request, "search.html", context={"result": result,
                                                       "key": key,
                                                       "length": length,
                                                       "now": now
                                                       })
    if request.method == "POST":
        now = datetime.datetime.now()
        key = request.POST.get("key")
        response = get("http://opdays.com:8080/song/search", params={"key": key})
        result = response.json()
        length = len(result)
        cache.set("now",now,60 * 60)
        cache.set("key", key,60 * 60)
        cache.set("result", result,60 * 60)
        cache.set("length", length,60 * 60)
        return render(request, "search.html", context={"result": result,
                                                       "key": key,
                                                       "length": length,
                                                       "now": now
                                                       })
