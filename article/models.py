from django.db import models
# Create your models here.
class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField('标题',max_length=100)
    date_time = models.DateTimeField('时间',auto_now_add=True)
    content = models.TextField('内容',blank=True, null=True)
    image_url = models.CharField('图片地址',max_length=255,blank=True,null=True)
    view = models.BigIntegerField(default=0)  # 阅读数
    type = models.CharField('文章类型',choices=(('html',"富文本"),('markdown',"markdown")),
                            max_length=155,default='markdown',null=False,blank=False)
    # discuess = models.ForeignKey('Discuss')
    class Meta:
        db_table = 'article'
        ordering = ['-date_time']# 按时间下降排序
        verbose_name = '文章'
        verbose_name_plural = '文章管理'
    def __str__(self):
        return self.title
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
    def to_dict(self):
        return dict(
            tag = self.tag,
            color = self.color,
        )

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

class Praise(models.Model):
    """
    文章点赞 一个文章可以有多个赞
    """
    id = models.AutoField(primary_key=True)
    ip = models.CharField('IP地址',max_length=32,null=True,blank=True,default=None)
    contry = models.CharField('国家',max_length=32,null=True,blank=True,default=None)
    city = models.CharField('城市', max_length=32, null=True, blank=True, default=None)
    description = models.CharField('描述', max_length=100, null=True, blank=True, default=None)
    date_time = models.DateTimeField('时间',auto_now_add=True)

    article = models.ForeignKey(Article,related_name='praises',blank=False)


    class Meta:
        unique_together = (("ip","description","article"),)
# class Discuss(models.Model):
#     id = models.AutoField(primary_key=True)
#     email = tag = models.CharField('邮箱',max_length=100,blank=False,null=False)
#     discuss = models.TextField('评论',blank=False, null=False)