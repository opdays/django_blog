from .ip import QQwry
from django.conf import settings
from django.http import HttpResponse
from .models import Article,Praise
from django.views.decorators.csrf import csrf_exempt
import json
q = QQwry()
q.load_file(settings.QQWRY, loadindex=False)


def query_ip(request):
    if request.META.get('HTTP_X_FORWARDED_FOR'):
        ip = request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = request.META['REMOTE_ADDR']
    print(ip)
    result = q.lookup(ip)
    print(result)
    if result:
        contry = result[0]
        city = result[1]
        return HttpResponse(json.dumps(
            dict(
                ip=ip,
                contry=contry,
                city=city
            )
        ),content_type="application/json")
    else:
        return HttpResponse(json.dumps(
            dict(
                ip=ip,
                contry=None,
                city=None
            )
        ),content_type="application/json")
@csrf_exempt
def sumbit_praise(request):
    if request.method == 'GET':
        return HttpResponse(status=403)
    post = request.POST
    article = Article.objects.get(id=post.get("article_id"))
    praise = Praise.objects.create(
        ip=post.get("ip"),
        contry=post.get("contry"),
        city=post.get("city"),
        description=post.get("description"),
        article=article
    )
    try:
        praise.save()
        return HttpResponse(json.dumps(dict(
            result="success"
        )))
    except:
        return HttpResponse(json.dumps(dict(
            result="error"
        )),status=500)


