from music.NEMbox.api import NetEase
from django.http import HttpResponseRedirect, HttpResponse,StreamingHttpResponse
from .models import Playlist,Songlist
import json
from requests import get


ne = NetEase()
JsonResponse = lambda body, status: HttpResponse(json.dumps(body, indent=4), content_type="application/json",
                                                 status=status)


def song(request, songid):
    url = ne.songs_detail_new_api([songid])


    return HttpResponse(url)


def play(request, playid):
    songlist = ne.myapi1(playid)
    return JsonResponse(songlist,200)