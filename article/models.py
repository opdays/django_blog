from django.db import models
from django.core.files.storage import FileSystemStorage


#http://python.usyiyi.cn/django_182/ref/models/fields.html#django.db.models.fields.files.FieldFile.url
# Create your models here.
class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField('标题', max_length=100)
    date_time = models.DateTimeField('时间', auto_now_add=True)
    content = models.TextField('内容', blank=True, null=True)
    image_url = models.CharField('图片地址', max_length=255, blank=True, null=True)
    view = models.BigIntegerField(default=0)  # 阅读数
    type = models.CharField('文章类型', choices=(('html', "富文本"), ('markdown', "markdown")),
                            max_length=155, default='markdown', null=False, blank=False)

    # discuess = models.ForeignKey('Discuss')
    class Meta:
        db_table = 'article'
        ordering = ['-date_time']  # 按时间下降排序
        verbose_name = '文章'
        verbose_name_plural = '文章管理'

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return "/article/%i" % self.id
    def to_dict(self):
        return dict(
            id=self.id,
            title=self.title,
            content=self.content,
            image_url=self.image_url,
            tag=[tag.to_dict() for tag in self.tags.all()]
        )

    def viewed(self):
        """
        增加阅读数
        :return:
        """
        self.view += 1
        self.save(update_fields=['view'])


class Tag(models.Model):
    """
    文章标签
    文章N - 标签M
    会有一张关联表 存对应关系
    manytomany放到哪里感觉都可以  删除一个文章 关联的标签不会删 删除一个标签 关联的文章不会删 只会删除关系的表的关系
    """
    id = models.AutoField(primary_key=True)
    tag = models.CharField('标签', max_length=100, default='未分类')
    color = models.CharField('颜色', max_length=16, default='#777')
    articles = models.ManyToManyField(Article, related_name='tags', blank=True)

    class Meta:
        db_table = 'tag'
        verbose_name = '标签'
        verbose_name_plural = '标签管理'

    def __str__(self):
        return self.tag

    def to_dict(self):
        return dict(
            tag=self.tag,
            color=self.color,
        )


class FriendLink(models.Model):
    id = models.AutoField(primary_key=True)
    linkname = models.CharField(max_length=125, null=False, blank=False)
    linkurl = models.CharField(max_length=125, null=False, blank=False)

    class Meta:
        db_table = 'friend_link'
        verbose_name = '友情链接'
        verbose_name_plural = '友情链接管理'

    def __str__(self):
        return self.linkname


class Praise(models.Model):
    """
    文章点赞 一个文章可以有多个赞
    文章N - 1赞

    """
    id = models.AutoField(primary_key=True)
    ip = models.CharField('IP地址', max_length=32, null=True, blank=True, default=None)
    contry = models.CharField('国家', max_length=32, null=True, blank=True, default=None)
    city = models.CharField('城市', max_length=32, null=True, blank=True, default=None)
    description = models.CharField('描述', max_length=100, null=True, blank=True, default=None)
    date_time = models.DateTimeField('时间', auto_now_add=True)

    article = models.ForeignKey(Article, related_name='praises', blank=False)
    #删除文章 文章关联的赞 全部被删除 CASCADE  默认的选项
    #删除一个赞 文章少一个赞

    class Meta:
        unique_together = (("ip", "description", "article"),)
        #同一个ip对一篇文章的评论 不能重复 3列唯一索引

class UploadImage(models.Model):
    """
    上传图片
    """
    date_time = models.DateTimeField('时间', auto_now_add=True)
    title = models.CharField(blank=True,max_length=100,null=True)
    image = models.ImageField(upload_to='photos/%Y/%m/%d')
    # class Discuss(models.Model):
    #     id = models.AutoField(primary_key=True)
    #     email = tag = models.CharField('邮箱',max_length=100,blank=False,null=False)
    #     discuss = models.TextField('评论',blank=False, null=False)
