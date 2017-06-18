/**
 * Created by Scott on 2016/7/7.
 */
;(function (window, document) {
    //公共方法
    var Public = {
        'timeFormat': function (time) {
            var tempMin = parseInt(time / 60);
            var tempSec = parseInt(time % 60);
            var curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
            var curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
            return curMin + ':' + curSec;
        },
        'leftDistance': function (el) {
            var left = el.offsetLeft;
            while (el.offsetParent) {
                el = el.offsetParent;
                left += el.offsetLeft;
            }
            return left;
        },
        'ajax': function (options) {
            var options = options || {};
            var xhr = new XMLHttpRequest();
            xhr.open('GET', options.url);
            xhr.setRequestHeader('Accept', '*/*');
            xhr.send(null);
            options.Before && options.Before();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                        options.Complete && options.Complete();
                    } else {
                        options.fail && options.fail(status);
                    }

                }
            };
        }
    };
    //对象主体
    skPlayer = function (options) {
        //配置检测
        var Tips;
        if (typeof options.music === 'number') {

            var music, target, audio, playBtn, currentTime, totalTime, currentVolume, totalVolume, quietVolume, currentTime_text, totalTime_text, cover, duration, musicItem, listSwitch;
            var sign = false;
            var avator;
            Public.ajax({
                url: options.url || (window.location.protocol + '//' + window.location.host + (options.prefix || '/music/api/playlist/') + options.music),
                success: function (responseText) {
                    //初始化
                    window.music = JSON.parse(responseText);
                    music = window.music;
                    window.target = document.getElementById('skPlayer');
                    target = window.target;
                    if (options.type && options.type == "song") {
                        music = [music];
                    }
                    var HTMLcontent = '<audio src="' + music[0]["song_url"] + '" preload="auto"></audio>';
                    HTMLcontent += '<div class="skPlayer-picture">';
                    HTMLcontent += '    <img src="' + music[0]["song_pic"] + '" alt="" class="skPlayer-cover">';
                    HTMLcontent += '    <a href="javascript:;" class="skPlayer-play-btn">';
                    HTMLcontent += '        <span class="skPlayer-left"></span>';
                    HTMLcontent += '        <span class="skPlayer-right"></span>';
                    HTMLcontent += '    </a>';
                    HTMLcontent += '</div>';
                    HTMLcontent += '<div class="skPlayer-control">';
                    HTMLcontent += '    <p class="skPlayer-name">' + music[0].song_name + '</p>';
                    HTMLcontent += '    <p class="skPlayer-author">' + music[0].song_artists + '</p>';
                    HTMLcontent += '    <div class="skPlayer-percent">';
                    HTMLcontent += '        <div class="skPlayer-line"></div>';
                    HTMLcontent += '    </div>';
                    HTMLcontent += '    <p class="skPlayer-time">';
                    HTMLcontent += '        <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>';
                    HTMLcontent += '    </p>';
                    HTMLcontent += '    <div class="skPlayer-volume skPlayer-hasList">';
                    HTMLcontent += '        <i class="skPlayer-icon" data-volume="0"></i>';
                    HTMLcontent += '        <div class="skPlayer-percent">';
                    HTMLcontent += '            <div class="skPlayer-line"></div>';
                    HTMLcontent += '        </div>';
                    HTMLcontent += '    </div>';
                    HTMLcontent += '    <div class="skPlayer-list-switch">';
                    HTMLcontent += '        <i class="skPlayer-list-icon"></i>';
                    HTMLcontent += '    </div>';
                    HTMLcontent += '</div>';
                    HTMLcontent += '<div class="switch" onclick="switchDiv();"></div>';
                    HTMLcontent += '<ul class="skPlayer-list">';
                    for (var item in music) {
                        HTMLcontent += '    <li data-index="' + item + '">';
                        HTMLcontent += '        <i class="skPlayer-list-sign"></i>';
                        HTMLcontent += '        <span class="skPlayer-list-index">' + (parseInt(item) + 1) + '</span>';
                        HTMLcontent += '        <span class="skPlayer-list-name">' + music[item]["song_name"] + '</span>';
                        HTMLcontent += '        <span class="skPlayer-list-author" title="' + music[item].song_artists + '">' + music[item].song_artists + '</span>';
                        HTMLcontent += '    </li>';
                    }
                    HTMLcontent += '</ul>';


                    target.innerHTML = HTMLcontent;
                    if (options.theme === 'red') {
                        target.className = 'skPlayer-red';
                    }
                    window.audio = target.querySelector('audio');
                    audio = window.audio;
                    playBtn = target.querySelector('.skPlayer-play-btn');
                    currentTime = target.querySelector('.skPlayer-percent').querySelector('.skPlayer-line');
                    totalTime = target.querySelector('.skPlayer-percent');
                    currentVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-line');
                    totalVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-percent');
                    quietVolume = target.querySelector('.skPlayer-icon');
                    currentTime_text = target.querySelector('.skPlayer-cur');
                    totalTime_text = target.querySelector('.skPlayer-total');
                    cover = target.querySelector('.skPlayer-cover');
                    musicItem = target.querySelectorAll('.skPlayer-list li');
                    listSwitch = target.querySelector('.skPlayer-list-switch');

                    target.classList.add('skPlayer-list-on');
                    $(".right-avator-bar img").attr("src", music[0].song_pic);
                    // $(".wihite-block.muisc-pannel").css("background-image",`url(${music[0].song_pic_big})`);
                    // $('#skPlayer').draggable({ appendTo: 'body' });
                    // var appendTo = $('.skPlayer-picture').draggable('option', 'appendTo');
                    // $('.skPlayer-picture').draggable('option', 'appendTo', 'body');
                    $("#skPlayer").draggable({handle: ".skPlayer-picture"}); //点击图片可以移动
                    //自定义转动图片
                    audio.old_play = audio.play;
                    audio.old_pause = audio.pause;
                    audio.play = function () {
                        audio.old_play();
                        $(".right-avator-bar img").addClass("xuanzhuan");
                    };
                    audio.pause = function () {
                        audio.old_pause();
                        $(".right-avator-bar img").removeClass("xuanzhuan");
                    };
                    //事件绑定
                    handleEvent();
                    return "success"; //加载成功给个信号

                },
                fail: function (status) {
                    console.error('歌单拉取失败！');
                    $(".alert strong").text("歌单拉取失败..");
                    $(".alert").removeClass("alert-warning").addClass("alert-danger").fadeOut(2000);
                    sign = true;
                },
                Before: function () {
                    Tips = '<div class="alert alert-warning">'
                    Tips += '<a href="#" class="close" data-dismiss="alert">'
                    // Tips += '&times;'
                    Tips += '</a>'
                    Tips += '<strong>正在拉取网易云音乐资源很慢一般需要30s...</strong>'
                    Tips += '</div>';
                    $(Tips).appendTo($('#content-header')).fadeIn(300);
                },
                Complete: function () {
                    // $(Tips).filter($("strong")).text("加载完成...");
                    $(".alert strong").text("加载完成..");
                    $(".alert").removeClass("alert-warning").addClass("alert-success").fadeOut(2000);
                },
            });
            if (sign) {
                return;
            }
        }

        //可播放状态
        function canPlayThrough() {
            if (options.loop === true) {
                audio.loop = true;
            }
            duration = this.duration;
            currentTime_text.innerHTML = '00:00';
            totalTime_text.innerHTML = Public.timeFormat(parseInt(duration));
            if (audio.volume == 1) {
                audio.volume = 0.7;
                currentVolume.style.width = '70%';
            }
        }

        //歌曲时长变动
        function durationChange() {
            duration = this.duration;
        }

        //时间更新
        function timeUpdate() {
            var curTime = parseInt(audio.currentTime);
            var playPercent = (curTime / duration) * 100;
            currentTime.style.width = playPercent.toFixed(2) + '%';
            currentTime_text.innerHTML = Public.timeFormat(curTime);
        }

        //播放结束
        function audioEnd() {
            if (Array.isArray(music) && music.length !== 1) {
                var index = parseInt(target.querySelector('.skPlayer-curMusic').getAttribute('data-index')) + 1;
                if (index < music.length) {
                    if (target.querySelector('.skPlayer-curMusic').nextSibling !== 1) {
                        target.querySelector('.skPlayer-curMusic').nextSibling.nextSibling.classList.add('skPlayer-curMusic');
                    } else {
                        target.querySelector('.skPlayer-curMusic').nextSibling.classList.add('skPlayer-curMusic');
                    }
                    target.querySelector('.skPlayer-curMusic').classList.remove('skPlayer-curMusic');
                    var data = music[index];
                } else {
                    target.querySelector('.skPlayer-list li').classList.add('skPlayer-curMusic');
                    target.querySelectorAll('.skPlayer-curMusic')[1].classList.remove('skPlayer-curMusic');
                    var data = music[0];
                }
                target.querySelector('.skPlayer-name').innerHTML = data["song_name"];
                target.querySelector('.skPlayer-author').innerHTML = data.song_artists;
                target.querySelector('.skPlayer-cover').src = data.song_pic;
                audio.src = data.song_url;
                //播放完成自动换图片
                $(".right-avator-bar img").attr("src", data.song_pic);
                // $(".wihite-block.muisc-pannel").css("background-image",`url(${data.song_pic_big})`);
                if (playBtn.classList.contains('skPlayer-pause')) {
                    try {
                        audio.play();
                        $(Tips).removeClass("alert-warning").addClass("alert-success").text("开始播放:" + data["song_name"]).remove().appendTo($('#content-header')).slideDown('slow').fadeOut(3000);
                    } catch (e) {
                        $(Tips).text("播放失败").appendTo($('#content-header')).fadeIn('show').fadeOut(3000);
                    }

                }
            } else {
                playBtn.classList.remove('skPlayer-pause');
                cover.classList.remove('skPlayer-pause');
            }
            currentTime_text.innerHTML = '00:00';
            currentTime.style.width = 0;
        }

        window.audioEnd = audioEnd;
        //播放控制
        function playClick() {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            if (playBtn.classList.contains('skPlayer-pause')) {
                playBtn.classList.remove('skPlayer-pause');
                cover.classList.remove('skPlayer-pause');
            } else {
                playBtn.classList.add('skPlayer-pause');
                cover.classList.add('skPlayer-pause');
            }
        }

        //进度控制
        function timeLineClick(event) {
            var e = window.event || event;
            var clickPercent;
            if (e.pageX) {
                clickPercent = (e.pageX - Public.leftDistance(this)) / this.offsetWidth;
            } else {
                clickPercent = (e.clientX - Public.leftDistance(this)) / this.offsetWidth;
            }
            currentTime.style.width = clickPercent * 100 + '%';
            audio.currentTime = parseInt(clickPercent * duration);
        }

        //音量控制
        function volumeLineClick(event) {
            var e = window.event || event;
            if (quietVolume.classList.contains('skPlayer-quiet')) {
                quietVolume.classList.remove('skPlayer-quiet');
            }
            var clickPercent;
            if (e.pageX) {
                clickPercent = (e.pageX - Public.leftDistance(this)) / this.offsetWidth;
            } else {
                clickPercent = (e.clientX - Public.leftDistance(this)) / this.offsetWidth;
            }
            currentVolume.style.width = clickPercent * 100 + '%';
            audio.volume = clickPercent.toFixed(2);
        }

        //静音控制
        function volumeQuiet() {
            if (audio.volume != 0) {
                quietVolume.setAttribute('data-volume', audio.volume);
                audio.volume = 0;
                currentVolume.style.width = 0;
                quietVolume.classList.add('skPlayer-quiet');
            } else {
                audio.volume = quietVolume.getAttribute('data-volume');
                currentVolume.style.width = quietVolume.getAttribute('data-volume') * 100 + '%';
                quietVolume.setAttribute('data-volume', '0');
                quietVolume.classList.remove('skPlayer-quiet');
            }
        }

        function changeMusic() {
            if (!this.classList.contains('skPlayer-curMusic')) {
                target.querySelector('.skPlayer-curMusic').classList.remove('skPlayer-curMusic');
                this.classList.add('skPlayer-curMusic');
                var index = this.getAttribute('data-index');
                var data = music[index];
                target.querySelector('.skPlayer-name').innerHTML = data.song_name;
                target.querySelector('.skPlayer-author').innerHTML = data.song_artists;
                target.querySelector('.skPlayer-cover').src = data.song_pic;
                audio.src = data.song_url;
                $(".right-avator-bar img").attr("src", data.song_pic);
                // $(".wihite-block.muisc-pannel").css("background-image",`url(${data.song_pic_big})`);
                if (playBtn.classList.contains('skPlayer-pause')) {
                    try {
                        audio.play();
                        $(Tips).removeClass("alert-warning").addClass("alert-success").text("开始播放:" + data["song_name"]).remove().appendTo($('#content-header')).slideDown('slow').fadeOut(3000);
                    } catch (e) {
                        $(Tips).text("播放失败").appendTo($('#content-header')).fadeIn('show').fadeOut(3000);
                    }
                }
                currentTime_text.innerHTML = '00:00';
                currentTime.style.width = 0;
            }
        }

        function switchList() {
            target.classList.contains('skPlayer-list-on') ? !function () {
                    //如果是打开状态 关闭
                    $(target).css("top", "490px").slideDown('slow');
                    target.classList.remove('skPlayer-list-on');

                }()
                : !function () {
                    //如果是关闭状态 打开
                    $(target).css("top", "318px").slideDown('slow');
                    target.classList.add('skPlayer-list-on');
                }();

            // target.classList.contains('skPlayer-list-on') ?  : $(target).css("bottom","172px").slideDown('slow');
        }

        //事件绑定函数
        function handleEvent() {
            //audio.addEventListener('canplaythrough', canPlayThrough);
            playBtn.addEventListener('click', playClick);
            audio.addEventListener('canplay', canPlayThrough);
            audio.addEventListener('durationchange', durationChange);
            audio.addEventListener('timeupdate', timeUpdate);
            audio.addEventListener('ended', audioEnd);
            totalTime.addEventListener('click', timeLineClick);
            totalVolume.addEventListener('click', volumeLineClick);
            quietVolume.addEventListener('click', volumeQuiet);
            if (Array.isArray(music)) {
                for (var item in music) {
                    musicItem[item].addEventListener('click', changeMusic);
                }
                target.querySelector('.skPlayer-list li:nth-child(1)').classList.add('skPlayer-curMusic');
                listSwitch.addEventListener('click', switchList);
            }
            $(".qq").off('click').click(function () {
                if(!Array.isArray(music)){
                    music=[music];
                }
                var index = $(".skPlayer-curMusic").removeClass("skPlayer-curMusic").attr("data-index");
                if (Number(index) === Number(music.length) - 1) {
                    index = 1;
                } else {
                    index = Number(index) + 1;
                }
                $("[data-index=" + index + "]").addClass("skPlayer-curMusic");
                var data = music[index];
                target.querySelector('.skPlayer-name').innerHTML = data.song_name;
                target.querySelector('.skPlayer-author').innerHTML = data.song_artists;
                target.querySelector('.skPlayer-cover').src = data.song_pic;
                audio.src = data.song_url;
                $(".right-avator-bar img").attr("src", data.song_pic);
                if (playBtn.classList.contains('skPlayer-pause')) {
                    try {
                        audio.play();
                        $(Tips).removeClass("alert-warning").addClass("alert-success").text("开始播放:" + data["song_name"]).remove().appendTo($('#content-header')).slideDown('slow').fadeOut(3000);
                    } catch (e) {
                        $(Tips).text("播放失败").appendTo($('#content-header')).fadeIn('show').fadeOut(3000);
                    }
                }
                currentTime_text.innerHTML = '00:00';
                currentTime.style.width = 0;


            });
            $(".github").off('click').click(function () {
                var index = $(".skPlayer-curMusic").removeClass("skPlayer-curMusic").attr("data-index");
                if(!Array.isArray(music)){
                    music=[music];
                }
                if (Number(index) === 0) {
                    index = Number(music.length) - 1;
                } else {
                    index = Number(index) - 1;
                }
                $("[data-index=" + index + "]").addClass("skPlayer-curMusic");
                var data = music[index];
                target.querySelector('.skPlayer-name').innerHTML = data.song_name;
                target.querySelector('.skPlayer-author').innerHTML = data.song_artists;
                target.querySelector('.skPlayer-cover').src = data.song_pic;
                audio.src = data["song_url"];
                $(".right-avator-bar img").attr("src", data.song_pic);
                if (playBtn.classList.contains('skPlayer-pause')) {
                    try {
                        audio.play();
                        $(Tips).removeClass("alert-warning").addClass("alert-success").text("开始播放:" + data["song_name"]).remove().appendTo($('#content-header')).slideDown('slow').fadeOut(3000);
                    } catch (e) {
                        $(Tips).text("播放失败").appendTo($('#content-header')).fadeIn('show').fadeOut(3000);
                    }
                }
                currentTime_text.innerHTML = '00:00';
                currentTime.style.width = 0;


            });
            //auto play
            playClick();
        }
    };
    //暴露接口
    window.skPlayer = skPlayer;
})(window, document);
//处理模块化
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = window.skPlayer;
}

var switchDiv = function () {
    var play = $("#skPlayer");
    var width = "380px";
    if (play.css("width") == "100px") {
        play.css("width", width);
        $(".skPlayer-control").css("display", "block")
    } else if (play.css("width") == width) {
        play.css("width", "100px").removeClass("skPlayer-list-on");
        $(".skPlayer-control").css("display", "none")
    }

};


var switchPlay = function (play_id) {
    skPlayer({music: play_id, theme: 'red', prefix: "/music/api/playlist/"});
    //$(".article-block.article-detail").css("background-image",`url(${big_image})`);
};

var switchArtist = function (artist_id) {
    skPlayer({music: artist_id, theme: 'red', prefix: "/music/api/artistlist/"});
};
var togglePlayer = function () {
    $("#skPlayer").toggle()
};

var playASong = function (song_id) {
    skPlayer({
        music: song_id,
        theme: 'red',
        url: "http://" + location.host + "/song/detail?id=" + song_id,
        type: "song"
    });
};
var plusASong = function (song_id) {
    $.ajax({
        url: "http://" + location.host + "/song/detail?id=" + song_id,
        method: "get",
        success: function (data) {
            if (window.music && Array.isArray(window.music)) {
                //如果是列表push进去
                window.music.push(data);
            } else {
                //如果是对象 push到列表
                window.music = [window.music];
                window.music.push(data);
            }

            var ul = $(".skPlayer-list");
            var li = $("[data-index]");
            var dataIndex = li.last().attr("data-index");
            var newLi = li.last().clone().attr("data-index", parseInt(dataIndex) + 1).removeClass("skPlayer-curMusic");
            newLi.html(
                '<i class="skPlayer-list-sign"></i>' +
                '<span class="skPlayer-list-index">' + parseInt(parseInt(dataIndex) + 2) + '</span>' +
                '<span class="skPlayer-list-name">' + data.song_name + '</span>' +
                '<span class="skPlayer-list-author" title="' + data.song_artists + '">' + data.song_artists + '</span> '
            );
            newLi.appendTo(ul);
            newLi.click(function () {
                console.log(this);
                if (!this.classList.contains('skPlayer-curMusic')) {
                    target.querySelector('.skPlayer-curMusic').classList.remove('skPlayer-curMusic');
                    this.classList.add('skPlayer-curMusic');
                    var index = this.getAttribute('data-index');
                    var data = music[index];
                    target.querySelector('.skPlayer-name').innerHTML = data.song_name;
                    target.querySelector('.skPlayer-author').innerHTML = data.song_artists;
                    target.querySelector('.skPlayer-cover').src = data.song_pic;
                    audio.src = data.song_url;
                    $(".right-avator-bar img").attr("src", data.song_pic);
                    // $(".wihite-block.muisc-pannel").css("background-image",`url(${data.song_pic_big})`);
                    if ($(".skPlayer-play-btn").hasClass('skPlayer-pause')) {
                        try {
                            audio.play();
                        } catch (e) {
                        }
                    }
                    currentTime_text.innerHTML = '00:00';
                    currentTime.style.width = 0;
                }
            });
            audio.addEventListener('ended',window.audioEnd);
            // var li = '<li data-index="' + item + '">';
            // li += '<i class="skPlayer-list-sign"></i>';
            // li +='<span class="skPlayer-list-index">' + (parseInt(item) + 1) + '</span>'; <span class="skPlayer-list-name">' + music[item]["song_name"] + '</span>';
            // li +='<span class="skPlayer-list-author" title="' + music[item].song_artists + '">' + music[item].song_artists + '</span>';
            // li +='</li>';
        }
    })

};