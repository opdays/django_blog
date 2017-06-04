from . import views,api
from django.conf.urls import url

urlpatterns = [
    url(r'^api/song/(?P<songid>\d+)', api.song),
    url(r'^api/playlist/(?P<playid>\d+)', api.play),
    url(r'^list$', views.song_list),

]

