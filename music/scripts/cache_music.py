from music.NEMbox.api import NetEase
from music.models import Playlist,Artistlist,Songlist

ne = NetEase()


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
    a = Artistlist.objects.create(
        artist_name="Taylor Swift 泰勒·斯威夫特",
        artist_id=44266,
        big_image="http://p4.music.126.net/Iklg78gz60cNR7nOmZFXqQ==/18687299627320705.jpg",
        sm_image="http://p4.music.126.net/Iklg78gz60cNR7nOmZFXqQ==/18687299627320705.jpg?parm=200y200"
    )
    muslist  = ne.api_artist("44266")
    for x in muslist:
        Songlist.objects.create(song_name=x.get("song_name"),
                                song_id=x.get("song_id"),
                                song_url=x.get("song_url"),
                                song_pic=x.get("song_pic"),
                                song_pic_big=x.get("song_pic_big"),
                                song_artists = x.get("song_artists"),
                                artist=a)
    p = Playlist.objects.create(
        play_name= "一个孤独的人听首歌吧",
    play_id =755501358,
    big_image = "http://p3.music.126.net/bUo74IWbS79FT1JDDME1Fw==/18889609765365752.jpg",
    sm_image ="http://p3.music.126.net/bUo74IWbS79FT1JDDME1Fw==/18889609765365752.jpg?param=200y200"
    )
    muslist = ne.api_playlist("755501358")
    for x in muslist:
        Songlist.objects.create(song_name=x.get("song_name"),
                                song_id=x.get("song_id"),
                                song_url=x.get("song_url"),
                                song_pic=x.get("song_pic"),
                                song_pic_big=x.get("song_pic_big"),
                                song_artists=x.get("song_artists"),
                                play=p)