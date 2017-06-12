from music.NEMbox.api import NetEase
from django.http import HttpResponseRedirect, HttpResponse
import json
from .models import Songlist,Artistlist,Playlist


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