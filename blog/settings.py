"""
Django settings for blog project.

Generated by 'django-admin startproject' using Django 1.10.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os
from yaml import load

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

config = open(os.path.join(BASE_DIR, 'config.yaml'))
yaml = load(config)
config.close()

BLOG = yaml.get('BLOG')
ICP = yaml.get('ICP')
ARTICLE = yaml.get('ARTICLE')
PER_PAGE_NUM = ARTICLE.get('PER_PAGE_NUM')
ABOUT = ARTICLE.get('ABOUT')
AVATOR = ARTICLE.get('AVATOR')
QQ = ARTICLE.get('QQ')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^3jdhax4m6_czq(@bktyem+pgsnpm*l2t@it5(w_)w&l#l6b^j'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(yaml.get('DEBUG'))

ALLOWED_HOSTS = ['blog.opdays.com', '192.168.174.131', '127.0.0.1']

# Application definition

INSTALLED_APPS = [
    'suit',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'article',
    'root',
    'pagedown',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # add中文
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'blog.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'article.views.blog_global_val',
            ],
        },
    },
]

WSGI_APPLICATION = 'blog.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'sqlite': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': yaml.get('DATABASES').get('NAME'),
        'USER': yaml.get('DATABASES').get('USER'),
        'PASSWORD': yaml.get('DATABASES').get('PASSWORD'),
        'HOST': yaml.get('DATABASES').get('HOST'),
        'PORT': yaml.get('DATABASES').get('PORT'),
        'OPTIONS': {'charset': 'utf8mb4'},
    },

}

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

# USE_TZ = True
USE_TZ = False
# 不要使用 UTC 只要设置了USE_TZ=True，django.util.timezone.now()输出地永远是UTC时间，不管你设置的TIME_ZONE是什么

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'  # 静态资源后缀
STATICFILES_DIRS = [  # 公共静态资源
    os.path.join(BASE_DIR, "static"),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'public_static')  # 运行manage.py collectstatic 收集的目录

# http://django-suit.readthedocs.io/en/develop/configuration.html
SUIT_CONFIG = {
    'ADMIN_NAME': u'博客后台',
    # 'SEARCH_URL': '/admin/api/server/',
    # 搜索的时候将?q=xxxxx传入的url
    'MENU': (
        {'app': 'article', 'label': '文章'},
    ),
    'LIST_PER_PAGE': 17,
}


# MEDIA_ROOT = os.path.join(BASE_DIR, "static/media")
# MEDIA_URL = '/media/tiny_mce/'
# ADMIN_MEDIA_PREFIX = '/static/admin/'
#
# TINYMCE_JS_ROOT = os.path.join(MEDIA_ROOT, "tiny_mce")
# TINYMCE_JS_URL = os.path.join(STATIC_URL, "media/tiny_mce/tiny_mce.js")
#
# TINYMCE_DEFAULT_CONFIG = {
# 'theme': 'advanced',
# 'theme_advanced_toolbar_location' : 'top',
# 'theme_advanced_toolbar_align' : 'left',
# 'width': 600,
# 'height': 400,
# }


QQWRY = os.path.join(BASE_DIR, "other/qqwry.dat")