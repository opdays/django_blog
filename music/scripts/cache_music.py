from music.NEMbox.api import NetEase
from music.models import Playlist


ne = NetEase()


def run():
    # response = ne.myapi1(748974562)
    Playlist.objects.create(play_name = "20首必听翻唱神曲",
                                   play_id=748974562,
                                   big_image="http://p4.music.126.net/AFwMYYqEZ420BallxyPanQ==/19127104276948464.jpg",
                                   sm_image="http://p4.music.126.net/AFwMYYqEZ420BallxyPanQ==/19127104276948464.jpg?param=200y200")
    Playlist.objects.create(play_name = "超带感的游戏背景音乐",
                                   play_id=740843438,
                                   big_image="http://p3.music.126.net/ogF-edD1lcwt9XqmRbdHJA==/18501482162522508.jpg",
                                   sm_image="http://p3.music.126.net/ogF-edD1lcwt9XqmRbdHJA==/18501482162522508.jpg?param=200y200")
    Playlist.objects.create(play_name = "扛着录音机出场的人，和他们的神级BGM",
                                   play_id=531688361,
                                   big_image="http://p4.music.126.net/HwVr-NnoEh3AcxYDmun9JQ==/109951162820432825.jpg",
                                   sm_image="http://p4.music.126.net/HwVr-NnoEh3AcxYDmun9JQ==/109951162820432825.jpg?param=200y200")
    Playlist.objects.create(play_name = "[回忆向]那些年的浪漫青春 被时光遗忘的歌",
                                   play_id=749021123,
                                   big_image="http://p3.music.126.net/MMZp5Z4ZiXTCS7iZ14S5yA==/19145795974637609.jpg",
                                   sm_image="http://p3.music.126.net/MMZp5Z4ZiXTCS7iZ14S5yA==/19145795974637609.jpg?param=200y200")

    # for x in response:
    #     Songlist.objects.create(play=play,**x)
    #     print(x.get("name"),"成功")
    # print(response)
