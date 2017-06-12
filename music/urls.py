from . import views,api
from django.conf.urls import url

urlpatterns = [
    url(r'^api/song/(?P<songid>\d+)', api.song),
    url(r'^api/playlist/(?P<playid>\d+)', api.play),
    url(r'^api/artistlist/(?P<artistid>\d+)', api.artist),
    url(r'^playlist$', views.song_list,name="play_list"),

]

