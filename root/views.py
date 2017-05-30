from django.shortcuts import render
from article.models import Article
from django.http import Http404, HttpResponseForbidden, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


# Create your views here.
# https://docs.djangoproject.com/en/dev/topics/auth/default/

def root_login(request):
    if request.method == 'GET':
        return render(request, "login.html")

    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        try:
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                # 转到成功页面
                return HttpResponseRedirect("/root")
            else:
                return HttpResponseForbidden()
        except:
            return HttpResponseForbidden()
    return render(request, "login.html")


def root_logout(request):
    logout(request)
    return HttpResponseRedirect("/article/page/")


@login_required(login_url='/root/login')
def root_index(request):
    return render(request, "_root_base.html")


@login_required(login_url='/root/login')
def root_article_list(request):
    articles = Article.objects.all()
    return render(request, "article_manager.html", context={"articles": articles})


@login_required(login_url='/root/login')
def root_article_editor(request, id):
    try:
        article = Article.objects.get(id=id)
    except:
        raise Http404()
    return render(request, "article_editor.html", context={"article": article})
