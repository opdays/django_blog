from . import views
from django.conf.urls import url


urlpatterns = [
    url(r'^page/(?P<page>\d*)$', views.article_list, name="article_list"),
    url(r'^(?P<tag>\w+)/(?P<page>\d*)$', views.tag_list, name="tag_list"),
    url(r'^(?P<id>\d+)$', views.article_detail, name="article_detail"),
]