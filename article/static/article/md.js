/**
 * Created by yangyang on 2017/5/4.
 */

$(function () {
        //响应式markdown 图片
        $('.article-detail img').addClass("img-responsive img-rounded center-block");

        //响应式markdown表格
        $('.post-content table').addClass("table table-bordered table-hover table-striped");

        //a标签打开标签页
        $('.post-content a').attr("target","_blank");

});

