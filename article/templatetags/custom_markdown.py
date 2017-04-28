import markdown

from django import template
from django.template.defaultfilters import stringfilter
from django.utils.encoding import force_text
from django.utils.safestring import mark_safe

register = template.Library()  # 自定义filter时必须加上


#https://docs.djangoproject.com/en/dev/howto/custom-template-tags/
@register.filter(is_safe=True)  # 注册template filter {{ | custom_markdown}}
@stringfilter  # 希望字符串作为参数
def custom_markdown(value):
    return mark_safe(markdown.markdown(value,
                                       extensions=['markdown.extensions.fenced_code', 'markdown.extensions.codehilite'],
                                       safe_mode=True,
                                       enable_attributes=False))

@register.simple_tag  # 注册template filter {% color_tag value color %}
@stringfilter  # 希望字符串作为参数
def color_tag(value,color):
    if not color:
        color = '#777'
    return mark_safe("<span class='label' style='background-color:%s'>%s</span>" % (color,value))

@register.simple_tag  # 注册template filter {% color_tag value color %}
@stringfilter  # 希望字符串作为参数
def a_color_tag(value,color):
    if not color:
        color = '#777'
    return mark_safe("<span style='background-color:%s'>%s</span>" % (color,value))
