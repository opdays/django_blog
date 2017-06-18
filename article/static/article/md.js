/**
 * Created by yangyang on 2017/5/4.
 */
$(function () {
    $('.btn.praise').click(function () {
        var result = null;
        $.ajax({
            url: "/article/api/query_ip",
            type: "GET",
            dateType: "json",
            success: function (result) {
                $(".modal-body #contry").html(result.contry);
                $(".modal-body #city").html(result.city);
                $(".modal-body #ip").html(result.ip);
            },
        });

        $('#praise_modal').modal();
    });
    $("#submit_praise").click(function () {
        var postObject = {};
        postObject.ip = $(".modal-body #ip").text();
        postObject.contry = $(".modal-body #contry").text();
        postObject.city = $(".modal-body #city").text();
        postObject.description = $(".modal-body #description").val();
        postObject.article_id = $("article.article-block.article-detail").attr('id');
        if (postObject.description.length >= 200 || postObject.description.length < 1) {
            alert("1-200个字");
            return true;
        }
        console.log(postObject.description);
        $.ajax({
            url: "/article/api/submit_praise",
            type: "POST",
            data: postObject,
            success: function (result) {
                location.reload();
            },
            error: function (error) {
                alert("同一个ip对一篇文章的评论 不能重复");
            }

        });
    });
});
!function () {
    $(function () {
        //响应式markdown 图片
        $('.article-detail img').addClass("img-responsive img-rounded center-block");

        //响应式markdown表格
        $('.post-content table').addClass("table table-bordered table-hover table-striped");

        //a标签打开标签页
        $('.post-content a').attr("target", "_blank");
        $('.html pre').css('padding', '0px');

    });
}();


