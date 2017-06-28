from django.shortcuts import render
from .models import Article, Tag, FriendLink,UploadImage
from django.http import Http404,HttpResponse
from django.conf import settings
from django.core.paginator import Paginator, EmptyPage
from django.db.models import Q

# Create your views here.
# from .templatetags import custom_markdown,color_tag

def index(request):
    return render(request, "index.html")


def blog_global_val(request):
    #articles = Article.objects.all()
    tags = Tag.objects.all()
    firendlink = FriendLink.objects.all()
    articles = Article.objects.all()
    #http://blog.csdn.net/huanongjingchao/article/details/46910521
    #http://www.cnblogs.com/hb91/p/5539070.html
    year_month = set()  # 设置集合，无重复元素
    for a in articles:
        year_month.add((a.date_time.year, a.date_time.month))  # 把每篇文章的年、月以元组形式添加到集合中
    counter = {}.fromkeys(year_month, 0)  # 以元组作为key，初始化字典
    for a in articles:
        counter[(a.date_time.year, a.date_time.month)] += 1  # 按年月统计文章数目
    year_month_number = []  # 初始化列表

    for key in counter:
        year_month_number.append([key[0], key[1], counter[key]])  # 把字典转化为（年，月，数目）元组为元素的列表
        year_month_number.sort(reverse=True)  # 排序
    return {
        "recently_articles": zip(range(1,7),articles[0:5]),
        "tags": tags,
        "firendlink": firendlink,
        'blog': settings.BLOG,
        'ABOUT': settings.ABOUT,
        'AVATOR': settings.AVATOR,
        'QQ': settings.QQ,
        'ICP': settings.ICP,
        'year_month_number': year_month_number
    }


def article_list(request, page):
    if request.GET.get("q"):
        q=request.GET.get("q")
        articles = Article.objects.filter(Q(content__contains=q)|Q(title__contains=q)).all()
    else:
        articles = Article.objects.all()
    paginator = Paginator(articles, settings.PER_PAGE_NUM)
    try:
        articles = paginator.page(int(page if page else 1))
    except EmptyPage:
        articles = paginator.page(paginator.num_pages)
    return render(request, "article_list.html", context={"articles": articles})


def article_detail(request, id):

    try:
        article = Article.objects.get(id=str(id))
    except:
        raise Http404
    response = render(request, "article_detail.html", context={"article": article})
    if not request.COOKIES.get(id):
        response.set_cookie(id, "viewd",path="/article")
        article.viewed()

    return response


def tag_list(request, tag, page):
    articles = Tag.objects.filter(tag=tag).first().articles.all()
    paginator = Paginator(articles, settings.PER_PAGE_NUM)
    try:
        articles = paginator.page(int(page if page else 1))
    except EmptyPage:
        articles = paginator.page(paginator.num_pages)
    return render(request, "tag_list.html", context={"tag": tag, "articles": articles})

def year_month_list(request,year,month,page):
    articles = Article.objects.filter(date_time__year=year,date_time__month=month).all()
    paginator = Paginator(articles, settings.PER_PAGE_NUM)
    try:
        articles = paginator.page(int(page if page else 1))
    except EmptyPage:
        articles = paginator.page(paginator.num_pages)
    return render(request, "year_month_list.html",
                  context={"articles": articles,"year":year,"month":month})




from django import forms
class ImageForm(forms.Form):
    title = forms.CharField()
    image = forms.ImageField()
def upload(request):
    if request.method == 'POST':
        print(request.POST,request.FILES)
        image_form = ImageForm(request.POST,request.FILES)
        if image_form.is_valid():
            image = image_form.cleaned_data['image']
            title = image_form.cleaned_data['title']
            obj = UploadImage.objects.create(image=image,title=title)
            return HttpResponse(obj.image.url)
        else:
            return HttpResponse("error")
    return HttpResponse("error")
from django.views.generic.dates import MonthArchiveView


class ArticleMonthArchiveView(MonthArchiveView):
    #http://python.usyiyi.cn/django/ref/class-based-views/generic-date-based.html
    queryset = Article.objects.all()
    date_field = "date_time"
    allow_future = False
