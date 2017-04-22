from django.db import models
from django.core.urlresolvers import reverse

# Create your models here.
class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    date_time = models.DateTimeField(auto_now_add=True)
    content = models.TextField(blank=True, null=True)
    image_url = models.CharField(max_length=255,blank=True,null=True)
    class Meta:  # 按时间下降排序
        db_table = 'article'
        ordering = ['-date_time']

    def __str__(self):
        return self.title


class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    tag = models.CharField(max_length=100,default='未分类')
    articles = models.ManyToManyField(Article)

    class Meta:
        db_table = 'tag'
    def __str__(self):
        return self.tag

class FriendLink(models.Model):
    id=models.AutoField(primary_key=True)
    linkname=models.CharField(max_length=125,null=False,blank=False)
    linkurl=models.CharField(max_length=125,null=False,blank=False)

    class Meta:
        db_table = 'friend_link'
    def __str__(self):
        return self.linkname