#!/bin/bash
#===============================================================
#       AUTHOR: YangYang yangyang@suishouji.com
#       CREATER: 2017-03-10 13:51:11
#       FILENAME: apiclt_v2.sh
#       DESCRIPTION: 
#       发布10.198.2.115 预生产
#       发布10.201.3.11 测试环境
#===============================================================

cd `dirname $0`
ABS_PATH="`pwd`/"

if [[ $1 == 'd' ]];then
    rsync -vr --exclude-from=".gitignore" --exclude ".git" --exclude "migrations" --exclude "blog/settings.py" $ABS_PATH blog.opdays.com:/var/www/django_blog/
    
fi
if [[ $1 == 'r'  ]];then
    ssh blog.opdays.com "supervisorctl restart all"
fi
