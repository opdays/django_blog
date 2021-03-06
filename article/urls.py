from . import views, api
from django.conf.urls import url
from django.views.generic import TemplateView
urlpatterns = [
    url(r'^page/(?P<page>\d*)$', views.article_list, name="article_list"),
    url(r'^(?P<tag>\w+)/(?P<page>\d*)$', views.tag_list, name="tag_list"),
    url(r'^(?P<id>\d+)$', views.article_detail, name="article_detail"),
    url(r'^api/query_ip$', api.query_ip, name="query_ip"),
    url(r'^api/submit_praise$', api.sumbit_praise, name="submit_praise"),
    url(r'^(?P<year>[0-9]{4})/(?P<month>[0-9]+)/(?P<page>\d*)$',
        views.year_month_list,
        name="year_month_list"),
    url(r'^upload$', views.upload, name="upload"),
    #https://docs.djangoproject.com/en/dev/ref/class-based-views/#built-in-class-based-views-api
    url(r'^chat$',TemplateView.as_view(template_name='chat.html')),
    url(r'^about$',TemplateView.as_view(template_name='about.html')),
]
