from . import views,api
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
urlpatterns = [
    url(r'^$', views.root_index, name="root_index"),
    url(r'^login$', views.root_login, name="root_login"),
    url(r'^logout$', views.root_logout, name="root_logout"),
    url(r'^article$', views.root_article_list, name="root_article_list"),
    url(r'^article/(?P<id>\d+)$', views.root_article_editor, name="root_article_editor"),
    url(r'^api/article([/]?)(?P<id>\d*)$', login_required(api.ArticleApi.as_view())),
]
