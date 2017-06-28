from music.NEMbox.api import NetEase
from django.http import HttpResponseRedirect, HttpResponse
import json
from .models import Songlist,Artistlist,Playlist
import random


ne = NetEase()
JsonResponse = lambda body, status: HttpResponse(json.dumps(body, indent=4), content_type="application/json",
                                                 status=status)


def song(request, songid):
    url = ne.songs_detail_new_api([songid])

    if url:
        return HttpResponse(url[0].get("url"))


def play(request, playid):

    p =Playlist.objects.filter(play_id=playid).first()
    if not p:
        songlist = ne.api_playlist(playid)
        return JsonResponse(songlist,200)


    songlist = []
    for x in p.songs.all():
        songlist.append(x.to_dict())
    return JsonResponse(songlist,200)

def artist(request, artistid):
    #songlist = ne.api_artist(artistid)
    a =Artistlist.objects.filter(artist_id=artistid).first()
    if not a :
        songlist = ne.api_artist(artistid)
        return JsonResponse(songlist,200)
    songlist =[]
    for x in a.songs.all():
        songlist.append(x.to_dict())
    return JsonResponse(songlist,200)

def random_50x50image(request):
    num = random.randint(1, 1500)
    try:
        pic_url = Songlist.objects.get(pk=num).song_pic_big+"?param=50y50"
    except:
        pic_url = Songlist.objects.get(pk=10).song_pic_big + "?param=50y50"
    return HttpResponse(pic_url)