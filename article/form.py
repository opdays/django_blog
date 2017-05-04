from django import forms

from pagedown.widgets import AdminPagedownWidget

from article.models import Article

class ArticleForm(forms.ModelForm):
    #name = forms.CharField(widget=AdminPagedownWidget())

    class Meta:
        model = Article
        fields = "__all__"