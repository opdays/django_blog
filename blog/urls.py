"""blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from article import views
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap

from article.models import Article

info_dict = {
    'queryset': Article.objects.all(),
    'date_field': 'date_time', #最后一次更新的时间
}
sitemaps = {
    'blog': GenericSitemap(info_dict, changefreq="weekly",priority=0.6),
    # 如果还要加其它的可以模仿上面的
}
#https://docs.djangoproject.com/en/1.11/ref/contrib/sitemaps/#django.contrib.sitemaps.Sitemap.location
#https://www.sitemaps.org/protocol.html#prioritydef
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index ,name="index"),
    url(r'^article/', include('article.urls')),
    url(r'^root/', include('root.urls')),
    url(r'^music/', include('music.urls')),
    url(r'^summernote/', include('django_summernote.urls')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
    name='django.contrib.sitemaps.views.sitemap'),
]
