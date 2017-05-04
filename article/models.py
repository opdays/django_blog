from django.db import models
# Create your models here.
class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField('标题',max_length=100)
    date_time = models.DateTimeField('时间',auto_now_add=True)
    content = models.TextField('内容',blank=True, null=True)
    image_url = models.CharField('图片地址',max_length=255,blank=True,null=True)
    # discuess = models.ForeignKey('Discuss')
    class Meta:  # 按时间下降排序
        db_table = 'article'
        ordering = ['-date_time']
        verbose_name = '文章'
        verbose_name_plural = '文章管理'
    def __str__(self):
        return self.title


class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    tag = models.CharField('标签',max_length=100,default='未分类')
    color = models.CharField('颜色',max_length=16,default='#777')
    articles = models.ManyToManyField(Article,related_name='tags',blank=True)


    class Meta:
        db_table = 'tag'
        verbose_name = '标签'
        verbose_name_plural = '标签管理'
    def __str__(self):
        return self.tag

class FriendLink(models.Model):
    id=models.AutoField(primary_key=True)
    linkname=models.CharField(max_length=125,null=False,blank=False)
    linkurl=models.CharField(max_length=125,null=False,blank=False)

    class Meta:
        db_table = 'friend_link'
        verbose_name = '友情链接'
        verbose_name_plural = '友情链接管理'
    def __str__(self):
        return self.linkname

# class Discuss(models.Model):
#     id = models.AutoField(primary_key=True)
#     email = tag = models.CharField('邮箱',max_length=100,blank=False,null=False)
#     discuss = models.TextField('评论',blank=False, null=False)