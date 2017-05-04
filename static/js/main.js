/**
 * Created by yangyang on 2017/4/26.
 */


var goTop = function () {
    if (document.body.scrollTop > 500) {
        $('#go_top').show();
    } else {
        $('#go_top').hide();
    }
};




/*ready*/

$(function () {
    $(window).scroll(goTop);  //监听滚动条事件
    $('#go_top').click(function () {
        //http://www.liaoxuefeng.com/static/themes/default/js/all.js
        $("body").animate({
            scrollTop: 0
        }, 1e3);
    }).hide();

   $('table').addClass("table table-bordered table-hover table-striped");
});

