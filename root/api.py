import json
from django.views import View
from article.models import Article,Tag
from django.http import JsonResponse


class ArticleApi(View):
    """
    文章restful api
    """
    def post(self, request, *args, **kw):
        data = json.loads(request.body.decode())
        # article = dict(
        #     title=data.get("article_title"),
        #     content=data.get("article_content"),
        #     image_url=data.get("article_image_url")
        # )
        data.update({"type":"html"})
        try:
            Article.objects.create(**data)
        except:
            return JsonResponse({"data": "error"})
        return JsonResponse({"data": "success"})
    def get(self, request, id,*args, **kw):
        if id:
            article = Article.objects.get(id=int(id))
            print(article)
            return JsonResponse(article.to_dict())
        else:
            return self.post(request,*args,**kw)
    def put(self, request, id,*args, **kw):
        if id:
            data=json.loads(request.body.decode())
            Article.objects.filter(id=id).update(**data)
            return JsonResponse({"data": "success"})
        else:
            return JsonResponse({"data": "error"})
class TagApi(View):
    def put(self, request, id,*args, **kw):
        if id:
            data=json.loads(request.body.decode())
            Tag.objects.filter(id=id).update(**data)
            return JsonResponse({"data": "success"})
        else:
            return JsonResponse({"data": "error"})
    def post(self, request, *args, **kw):
        data = json.loads(request.body.decode())
        try:
            Tag.objects.create(**data)
        except:
            return JsonResponse({"data": "error"})
        return JsonResponse({"data": "success"})