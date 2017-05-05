/**
 * Created by yangyang on 2017/4/26.
 */


var goTop = function () {
    if (document.body.scrollTop > 500) {
        $('#go_top').show();
        $('#go_parise').show();
    } else {
        $('#go_top').hide();
        $('#go_parise').hide();
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

    // $('#go_parise').click(function () {
    //
    //     location.href = location.href +"#praise";
    // }).hide();

});

