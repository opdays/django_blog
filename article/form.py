from django import forms

from pagedown.widgets import AdminPagedownWidget
from article.models import Article



# Apply summernote to specific fields.
# class ArticleForm(forms.Form):
#     content = forms.CharField(widget=SummernoteWidget())  # instead of forms.Textarea

# class ArticleForm(forms.ModelForm):
#     #name = forms.CharField(widget=AdminPagedownWidget())
#     class Meta:
#         model = Article
#         fields = "__all__"
#         widgets = {
#             'content': SummernoteInplaceWidget(),
#         }