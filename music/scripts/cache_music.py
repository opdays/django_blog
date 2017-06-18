from music.NEMbox.api import NetEase
from music.models import Playlist, Artistlist, Songlist

ne = NetEase()


def updateA():
    # a = Artistlist.objects.create(
    #     artist_name="Taylor Swift 泰勒·斯威夫特",
    #     artist_id=44266,
    #     big_image="http://p4.music.126.net/Iklg78gz60cNR7nOmZFXqQ==/18687299627320705.jpg",
    #     sm_image="http://p4.music.126.net/Iklg78gz60cNR7nOmZFXqQ==/18687299627320705.jpg?parm=200y200"
    # )

    artists = Artistlist.objects.filter(pk__in=[1, 2, 3])
    for a in artists:
        muslist = ne.api_artist(a.artist_id)
        for x in muslist:
            try:
                Songlist.objects.filter(song_id=x.get("song_id")).update(song_name=x.get("song_name"),
                                                                         song_id=x.get("song_id"),
                                                                         song_url=x.get("song_url"),
                                                                         song_pic=x.get("song_pic"),
                                                                         song_pic_big=x.get("song_pic_big"),
                                                                         song_artists=x.get("song_artists"),
                                                                         artist=a)
            except:
                continue


def updateP():
    pl = Playlist.objects.filter(pk__in=[1, 4, 5, 7])
    for p in pl:
        muslist = ne.api_playlist(p.play_id)
        for x in muslist:
            try:
                Songlist.objects.filter(song_id=x.get("song_id")).update(song_name=x.get("song_name"),
                                                                         song_id=x.get("song_id"),
                                                                         song_url=x.get("song_url"),
                                                                         song_pic=x.get("song_pic"),
                                                                         song_pic_big=x.get("song_pic_big"),
                                                                         song_artists=x.get("song_artists"),
                                                                         play=p)
            except:
                continue


def addP(playid):
    p = Playlist.objects.get(play_id=playid)
    muslist = ne.api_playlist(str(playid))
    for x in muslist:
        try:
            Songlist.objects.create(song_name=x.get("song_name"),
                                    song_id=x.get("song_id"),
                                    song_url=x.get("song_url"),
                                    song_pic=x.get("song_pic"),
                                    song_pic_big=x.get("song_pic_big"),
                                    song_artists=x.get("song_artists"),
                                    play=p)
        except:
            Songlist.objects.filter(song_id=x.get("song_id")).update(
                song_name=x.get("song_name"),
                song_id=x.get("song_id"),
                song_url=x.get("song_url"),
                song_pic=x.get("song_pic"),
                song_pic_big=x.get("song_pic_big"),
                song_artists=x.get("song_artists"),
                play=p
            )


def run():
    # song_name
    # song_id
    # song_pic
    # song_pic_big
    # song_url
    # song_lyrics
    # artist
    # # response = ne.myapi1(748974562)
    # artist_name
    # artist_id
    # add_time
    # big_image
    #
    # sm_image
    addP(321674374)
