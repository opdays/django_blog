#!/usr/bin/python
# -*- coding:utf-8 -*-
#===============================================================
#       AUTHOR: YangYang yangyang@suishouji.com
#       CREATER: 2017-05-31 00:07:25
#       FILENAME: upload.py
#       DESCRIPTION:
#===============================================================

import requests

import sys
if sys.argv[1] == 'upload':
    url="http://127.0.0.1:8000/article/upload"
    data={
        "title":"logo"
    }
    with open('./logo.png', 'rb') as f:
        res=requests.post(url,data=data,files={'image': f})
    print(res.text)

