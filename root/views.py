from django.shortcuts import render
from article.models import Article, Tag, FriendLink, Praise
from django.http import Http404, HttpResponseForbidden, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.generic import View

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
    context = {
        "article_count": Article.objects.count(),
        "tag_count": Tag.objects.count(),
        "praise_count": Praise.objects.count(),
        "friend_count": FriendLink.objects.count()
    }
    return render(request, "_root_base.html", context=context)


class ModelsRoot(View):
    def get(self,request,model,id,*args,**kw):
        """
        /root/article/<table>/<id>
        :param request:
        :param model:
        :param id:
        :param args:
        :param kw:
        :return:
        """
        if model == 'article':
            if id:
                try:
                    article = Article.objects.get(id=id)
                except:
                    raise Http404()
                return render(request, "article_editor.html", context={"article": article})
            articles = Article.objects.all()
            return render(request, "article_manager.html", context={"articles": articles})

        if model == 'tag':
            tags = Tag.objects.all()
            return render(request, "article_tag.html", context={"tags": tags})
        if model == 'friendlink':
            friends = FriendLink.objects.all()
            return render(request, "article_friendlink.html", context={"friends": friends})
        if model == 'praise':
            praises = Praise.objects.all()
            return render(request, "article_praise.html", context={"praises": praises})





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
