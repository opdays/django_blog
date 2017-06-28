from . import views,api
from django.conf.urls import url

urlpatterns = [
    url(r'^api/song/(?P<songid>\d+)', api.song),
    url(r'^api/playlist/(?P<playid>\d+)', api.play),
    url(r'^api/artistlist/(?P<artistid>\d+)', api.artist),
    url(r'^api/randompic', api.random_50x50image,name="random_50x50image"),
    url(r'^playlist$', views.song_list,name="play_list"),
    url(r'^search', views.search,name="search"),

    url(r'^test', views.test,name="test"),

]

