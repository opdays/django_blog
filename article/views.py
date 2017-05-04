from django.shortcuts import render
from .models import Article,Tag,FriendLink
from django.http import Http404
from django.conf import settings
from django.core.paginator import Paginator ,EmptyPage
# Create your views here.
#from .templatetags import custom_markdown,color_tag

def index(request):
    return render(request,"index.html")

def blog_global_val(request):
    articles = Article.objects.all()
    tags = Tag.objects.all()
    firendlink = FriendLink.objects.all()

    return {
        "articles":articles,
        "tags":tags,
        "firendlink":firendlink,
        'blog': settings.BLOG,
        'avator': settings.AVATOR,
        'QQ': settings.QQ,
        'ICP':settings.ICP,
    }


def article_list(request,page):
    articles = Article.objects.all()
    paginator = Paginator(articles, settings.PER_PAGE_NUM)
    if request.META.get('HTTP_X_FORWARDED_FOR'):
        ip = request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = request.META['REMOTE_ADDR']
    print(ip)
    try:
        articles = paginator.page(int(page if page else 1))
    except EmptyPage:
        articles = paginator.page(paginator.num_pages)
    return render(request, "article_list.html",context={"articles": articles})
def article_detail(request,id):
    try:
        article =  Article.objects.get(id=str(id))
    except:
        Http404
    return render(request, "article_detail.html", context={"article": article})


def tag_list(request,tag,page):
    articles = Tag.objects.filter(tag =tag).first().articles.all()
    paginator = Paginator(articles, settings.PER_PAGE_NUM)
    try:
        articles = paginator.page(int(page if page else 1))
    except EmptyPage:
        articles = paginator.page(paginator.num_pages)
    return render(request, "tag_list.html",context={"tag":tag,"articles":articles})