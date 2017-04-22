from django.shortcuts import render
from .models import Article,Tag,FriendLink
from django.http import Http404
# Create your views here.
from .templatetags.custom_markdown import custom_markdown

def blog_global_val(request):
    articles = Article.objects.all()
    tags = Tag.objects.all()
    firendlink = FriendLink.objects.all()

    return {
        "articles":articles,
        "tags":tags,
        "firendlink":firendlink
    }
def index(request):
    return render(request, "main.html")
def detail(request,id):
    try:
        article =  Article.objects.get(id=str(id))
    except:
        Http404
    return render(request, "detail.html", context={"article": article})
