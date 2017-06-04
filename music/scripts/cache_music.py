from music.NEMbox.api import NetEase
from music.models import Playlist,Songlist


ne = NetEase()


def run():
    response = ne.myapi1(714871062)
    play = Playlist.objects.get(play_name = "毕业那些年的歌")
    for x in response:
        Songlist.objects.create(play=play,**x)
        print(x.get("name"),"成功")