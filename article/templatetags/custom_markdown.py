import markdown2

from django import template
from django.template.defaultfilters import stringfilter
from django.utils.encoding import force_text
from django.utils.safestring import mark_safe

register = template.Library()  # 自定义filter时必须加上


# https://docs.djangoproject.com/en/dev/howto/custom-template-tags/
@register.filter(is_safe=True)  # 注册template filter {{ | custom_markdown}}
@stringfilter  # 希望字符串作为参数
def custom_markdown(value):
    return mark_safe(markdown2.markdown(value, extras=[
        'fenced-code-blocks',  # 代码语法高亮
        'tables',  # 支持table
        'pyshell',  # 支持<<<
        "wiki-tables"  # 支持wikitable 语法
    ], ))


@register.simple_tag  # 注册template filter {% color_tag value color %}
@stringfilter  # 希望字符串作为参数
def color_tag(value, color):
    if not color:
        color = '#777'
    return mark_safe("<span class='label' style='background-color:%s'>%s</span>" % (color, value))


@register.simple_tag  # 注册template filter {% color_tag value color %}
@stringfilter  # 希望字符串作为参数
def a_color_tag(value, color):
    if not color:
        color = '#777'
    return mark_safe("<span style='background-color:%s'>%s</span>" % (color, value))

@register.filter()
@stringfilter
def delete_markdown_tag(value):
    import re
    regex=re.compile(r'[_*>#]+]')
    value,_ = regex.subn("",value)
    return value
