/**
 * Created by yangyang on 2017/6/3.
 */
var weiboName = "@Barret李靖";
var disqusName = "";
var fromBaidu = /^http(s)?:\/\/(\w+?\.)?baidu.com/.test(document.referrer);

var params = {};
~ function () {
  var search = location.href.split('?')[1];
  search = search && search.split('&') || [];
  for (var i = 0; i < search.length; i++) {
    var m = search[i].split('=');
    if (m && m[0]) {
      params[m[0]] = m[1];
    }
  }
}();

if (params['share']) {
  $('html').addClass('shareMode');
  $('<p style="color:#555;text-align:right; font-size:14px;" id="authorAppend">文 / 小胡子哥</p>').prependTo('.post-content');
} else {
  $('html').removeClass('shareMode');
  $('#authorAppend').remove();
}

$(function () {
  var text = '';
  var m = navigator.appVersion.match(/MSIE (\d+)/i);
  m = m && m[1];
  if (fromBaidu) {
    // text = "您还在使用百度搜索，珍爱生命，请远离百度！<a href='javascript:void(0);' class='close'>关闭</a>";
  }
  if (m && m < 10) {
    text = "更好的阅读体验，请使用最新版的 Chrome 浏览器。<a href='javascript:void(0);' class='close'>关闭</a>";
  }
  if (text && !$('html').attr('loaded')) {
    $(".rainbow").addClass('notice').html(text).hide().fadeIn();
  }
});

if (window.location.protocol == 'https:') {
  $("img").each(function () {
    var src = $(this).attr('src');
    if (/ww1.sinaimg.cn/.test(src)) {
      $(this).attr('src', src.replace('ww1.', 'www.'));
    }
  });
}

function notify(notice) {
  if (!("Notification" in window)) {
    // window.console && console.warn("浏览器不支持提醒");
  } else if (Notification.permission === "granted") {
    var notification = new Notification(notice.title, notice);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(notice.title, notice);
      }
    });
  }

  if (notification) {
    notification.onclick = function () {
      if (notice.url) {
        window.open(notice.url);
      } else {
        $('.chatroom-fold .chatroom-info').trigger('click');
        window.focus();
      }
      notification.close();
    }
  }
}

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }
  var config = $.cookie = function (key, value, options) {
    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);
      if (typeof options.expires === 'number') {
        var days = options.expires,
          t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }
      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join(''));
    }
    var result = key ? undefined : {};
    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');
      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }
      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }
    return result;
  };
  config.defaults = {};
  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }
    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, {
      expires: -1
    }));
    return !$.cookie(key);
  };
}));

var log = function (msg) {
  console && console.log && console.log(msg);
};
// 模板引擎
var tplEngine = function (tpl, data) {
  var reg = /<%([^%>]+)?%>/g,
    regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'var r=[];\n',
    cursor = 0;

  var add = function (line, js) {
    js ? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n') :
      (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
    return add;
  }
  while (match = reg.exec(tpl)) {
    add(tpl.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(tpl.substr(cursor, tpl.length - cursor));
  code += 'return r.join("");';
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
};
// 移动设备侦测
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

var operation = {
  init: function () {
    this.fontChange();
    this.toTop();
    this.footerNav();
  },

  // 底部tab切换
  footerNav: function () {
    $(".footer-nav a").on("click", function (evt) {

      evt.preventDefault();

      var index = $(this).index();
      $(".footer-nav a").removeAttr("id");
      $(this).attr("id", "comments");

      $(".nav-detail>div").hide().eq(index).fadeIn();
    });
    $(".relative-to-comment").on("click", function () {
      $(".footer-nav a").eq(0).trigger("click");
    });
  },
  // 回到顶部
  toTop: function () {
    var $toTop = $(".gotop");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= $(window).height()) {
        $toTop.css("display", "block").fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.on("click", function (evt) {
      var $obj = $("body,html");
      $obj.animate({
        scrollTop: 0
      }, 240);

      evt.preventDefault();
    });
  },

  // 字体修改
  fontChange: function () {
    $(".font-type").on("click", function () {
      $(this).parent().find("a")
        .toggleClass("font-type-song")
        .toggleClass("font-type-hei");

      $("body").toggleClass("post-font-song");
    });
    $(".bg-type").on("click", function () {
      $(this).parent().find("a")
        .toggleClass("font-type-song")
        .toggleClass("font-type-hei");

      $("body").toggleClass("body-bg-moon");
    });
  }
};

var decoration = {
  init: function () {
    this.initNav();
    this.consoleCtt();
    this.menuIndex($('.post'));
    this.navTurner();
    this.sidebarNav();
  },
  initNav: function () {
    var self = this;
    var $nav = $('.arrow-expend');
    if (!$nav.length || !$nav.find("li").length) return;
    var $ul = $nav.find("ul");
    $nav.show().on("mouseenter", function () {
      clearTimeout(self.arrowTimer);
      $ul.slideDown(300);
    }).on("click", function (evt) {
      clearTimeout(self.arrowTimer);
      evt.stopPropagation();
      $ul.slideToggle(300);
    });
    $("body").on("click touchstart", function (evt) {
      clearTimeout(self.arrowTimer);
      var $target = $(evt.target);
      if ($target.hasClass("arrow-expend") || $target.parent(".arrow-expend").length) {
        // ...
      } else {
        self.arrowTimer = setTimeout(function () {
          $ul.slideUp(300);
        }, 300);
      }
    });
    if (!$(".container .article").length) return;
    if (window.innerHeight <= 550) {
      $ul.slideUp(300);
    }
    $(window).on("resize", function () {
      clearTimeout(self.arrowTimer);
      if (window.innerHeight > 550) {
        $ul.slideDown(300);
      } else {
        $ul.slideUp(300);
      }
    });
  },
  // 鼠标移动添加效果
  sidebarNav: function () {
    var left = 48;
    if (operation.isIE()) {
      left = 90;
    }
    $(".sidebar").mouseenter(function () {
      $(this).addClass("sidebar-hover");
    }).mouseleave(function () {
      $(this).removeClass("sidebar-hover");
    });
    $(".func-item").mouseenter(function () {
      $(this).children("div").css({
        "left": left,
        "opacity": "0",
        "display": "block"
      }).clearQueue().show().stop().animate({
        "left": left - 15,
        "opacity": "1"
      }, "fast");
    }).mouseleave(function () {
      $(this).children("div").stop().delay().animate({
        "left": left,
        "opacity": "0"
      }, "fast", function () {
        $(this).hide()
      });
    });
  },
  // 导航树
  menuIndex: function ($obj) {
    if ($('h3', $obj).length > 2 && !isMobile.any()) {
      var h3 = [],
        h4 = [],
        tmpl = '<ul>',
        h3index = 0;

      $.each($('h3,h4', $obj), function (index, item) {
        if (item.tagName.toLowerCase() == 'h3') {
          var h3item = {};
          h3item.name = $(item).text();
          h3item.id = 'menuIndex' + index;
          h3.push(h3item);
          h3index++;
        } else {
          var h4item = {};
          h4item.name = $(item).text();
          h4item.id = 'menuIndex' + index;
          if (!h4[h3index - 1]) {
            h4[h3index - 1] = [];
          }
          h4[h3index - 1].push(h4item);
        }
        item.id = 'menuIndex' + index
      });

      //添加h1
      tmpl += '<li class="h1"><a href="#" data-top="0">' + $('h1').text() + '</a></li>';

      for (var i = 0; i < h3.length; i++) {
        tmpl += '<li><a href="#" data-id="' + h3[i].id + '">' + h3[i].name + '</a></li>';
        if (h4[i]) {
          for (var j = 0; j < h4[i].length; j++) {
            tmpl += '<li class="h4"><a href="#" data-id="' + h4[i][j].id + '">' + h4[i][j].name + '</a></li>';
          }
        }
      }
      tmpl += '</ul>';

      $('body').append('<div id="menuIndex"></div>');
      $('#menuIndex').append($(tmpl)).delegate('a', 'click', function (e) {
        e.preventDefault();
        var scrollNum = $(this).attr('data-top') || $('#' + $(this).attr('data-id')).offset().top;
        //window.scrollTo(0,scrollNum-30);
        $('body, html').animate({
          scrollTop: scrollNum - 30
        }, 400, 'swing');
      }) /*.append("<a href='javascript:void(0);' onclick='return false;' class='menu-unfold'>&gt;</a>");*/

      $(window).load(function () {
        var scrollTop = [];
        $.each($('#menuIndex li a'), function (index, item) {
          if (!$(item).attr('data-top')) {
            var top = $('#' + $(item).attr('data-id')).offset().top;
            scrollTop.push(top);
            $(item).attr('data-top', top);
          }
        });

        var waitForFinalEvent = (function () {
          var timers = {};
          return function (callback, ms, uniqueId) {
            if (!uniqueId) {
              uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
              clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
          };
        })();

        $(window).scroll(function () {
          waitForFinalEvent(function () {
            var nowTop = $(window).scrollTop(),
              index, length = scrollTop.length;
            if (nowTop + 60 > scrollTop[length - 1]) {
              index = length
            } else {
              for (var i = 0; i < length; i++) {
                if (nowTop + 60 <= scrollTop[i]) {
                  index = i
                  break;
                }
              }
            }
            $('#menuIndex li').removeClass('on')
            $('#menuIndex li').eq(index).addClass('on')
          })
        });
      });

      //用js计算屏幕的高度
      $('#menuIndex').css('max-height', $(window).height() - 80);
    }
  },

};

$(function () {
  // 初始化项目
  operation.init();
  decoration.init();
  $(".highlight").parent(".highlight").removeClass("highlight");
  $("code").removeClass("highlight").each(function () {
    var $hasB = $(this).parent(".highlight");
    var $hasP = $(this).parent("pre");
    if (!$hasB.size() && $hasP.size()) {
      $hasP.wrap("<div class='highlight'></div>");
    }
  });
});

window.alert = function () {};

$(window).on("load", function () {


    // 百度收录，自动推送
});



$(function () {
  var $layer = $("<div/>").css({
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    zIndex: 9,
    background: "#000",
    opacity: "0.6",
    display: "none"
  }).attr("data-id", "b_layer");
  var cloneImg = function ($node) {
    var left = $node.offset().left;
    var top = $node.offset().top - $(window).scrollTop();
    var nodeW = $node.width();
    var nodeH = $node.height();
    return $node.clone().css({
      position: "fixed",
      width: nodeW,
      height: nodeH,
      left: left,
      top: top,
      zIndex: 10
    });
  };
  var justifyImg = function ($c) {
    var dW = $(window).width();
    var dH = $(window).height();
    $c.css("cursor", "move").attr("data-b-img", 1);
    var img = new Image();
    img.onload = function () {
      var width = this.width >= dW - 18 ? dW - 18 : this.width;
      var height = this.height / this.width * width;
      $c.stop().animate({
        width: width,
        height: height,
        left: (dW - width) / 2,
        top: (dH - height) / 2
      }, 300);
    };
    img.src = $c.attr("src");
  };

  $(".post-content img, .pay img, .site-avatar img, .follow-wechat img, .about-wechart")
    .css("cursor", "zoom-in").off().on("click", function (evt) {
      if (isMobile.any()) {
        return;
      }
      // if($(this).parent("a").size()) {
      //   return;
      // }
      evt.preventDefault();
      evt.stopPropagation();
      var $b = $("body");
      $layer.appendTo($b);
      $layer.fadeIn(300);
      var $c = cloneImg($(this));
      $c.appendTo($b);
      justifyImg($c);
    }).each(function () {
      // if($(this).parent("a").size()) {
      //   $(this).css('cursor', 'inherit');
      //   return;
      // }
    });

  var timer = null;
  $(window).on("resize", function () {
    $("img[data-b-img]").each(function () {
      var $this = $(this);
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        justifyImg($this);
      }, 10);
    });
  });

  var $body = $("body");
  var moving = false;
  $body.on("mousedown touchstart", "img[data-b-img]", function (evt) {
    evt.stopImmediatePropagation();
    var $target = $(evt.target);
    var oX = evt.pageX;
    var oY = evt.pageY;
    $target.prop("draggable", false);
    $body.on("mousemove touchmove", function (evt) {
      evt.stopImmediatePropagation();
      moving = true;
      var dX = evt.pageX - oX;
      var dY = evt.pageY - oY;
      oX = evt.pageX;
      oY = evt.pageY;
      $target.css({
        left: "+=" + dX,
        top: "+=" + dY
      });
    });
    $body.on("mouseup mouseleave touchend touchcancel", function (evt) {
      evt.stopImmediatePropagation();
      setTimeout(function () {
        moving = false;
      }, 300);
      $target.removeProp("draggable");
      $body.off("mousemove mouseup mouseleave touchmove touchend touchcancel");
    });
  });

  $(window).on("click keydown touchstart", function (evt) {
    if (moving) return;
    if (evt.type == "keydown" && evt.keyCode === 27) {
      $layer.fadeOut(300);
      $("img[data-b-img]").remove();
    }
    var $this = $(evt.target);
    if ($this.attr("data-id") == "b_layer" || $this.attr("data-b-img") == 1) {
      $layer.fadeOut(300);
      $("img[data-b-img]").remove();
    } else if ($("img[data-b-img]").size()) {
      $layer.fadeOut(300);
      $("img[data-b-img]").remove();
    }
  });
});

;
(function () {

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  var $flyzone;

  function flyzone() {
    if (!$flyzone) {
      $flyzone = $("<div>").attr("id", "flyzone").prependTo(document.body);
    }

    return $flyzone;
  }

  var sizes = ["smaller", "small", "medium", "large", "fat"];

  var sizeDimensions = {
    "smaller": 40,
    "small": 70,
    "medium": 90,
    "large": 120,
    "fat": 200
  };

  function randomOpacity(threshold) {
    var opacity = Math.random();

    while (opacity < threshold) {
      opacity = Math.random();
    }

    return opacity;
  }

  function makeLarry(sizeName, speed) {
    var size = sizeDimensions[sizeName];
    var top = Math.floor((flyzone().height() - size) * Math.random());

    var $img = $("<img>")
      .addClass("larry size-" + sizeName)
      .attr("src", "/blogimgs/avatar150.png")
      .attr({
        "tabindex": "0",
        "aria-hidden": "true"
      })
      .attr("width", size)
      .attr("height", size)
      .css({
        position: "absolute",
        opacity: randomOpacity(0.4),
        top: top,
        left: -size + 15
      });

    $img.prependTo(flyzone());

    var left = flyzone().width() + size;

    $img.animate({
      left: left
    }, speed, function () {
      $img.remove();
      makeRandomLarry();
    });

    return $img;
  }

  function makeRandomLarry() {
    var size = randomItem(sizes);
    var speed = Math.floor(Math.random() * 20000) + 15000;
    return makeLarry(size, speed);
  }

  $(function () {
    $("#indexLogo").click(function () {
      makeRandomLarry();
    });
    $(".home-box h2 a").click(function (evt) {
      evt.preventDefault();
      makeRandomLarry();
      return false;
    });
  });

  var match = (/\blarry(=(\d+))?\b/i).exec(window.location.search);
  if (match) {
    var n = parseInt(match[2]) || 20;
    $(function () {
      for (var i = 0; i < n; ++i) {
        setTimeout(makeRandomLarry, Math.random() * n * 500);
      }
    });
  }
})();

;
typeof history.pushState === 'function' && (function () {
  var href = window.location.href;
  history.replaceState({
    url: href
  }, '', href);
  var pageCache = window.pageCache = window.pageCache || {};

  function pjax(url, tag) {
    if (!tag) {
      history.pushState({
        url: url
      }, '', url);
    }
    if (pageCache[url]) {
      return render(pageCache[url]);
    }
    // var loadingWords = ['伸个懒腰再来~', '打个呵欠再来~', '加载中...', '玩命加载中...', '同学，你很帅！', '这是 Pjax 效果；）', '不要问我这是啥!', '我在加载...', '客官稍等~', '欢迎继续踩点！', '我认识你！', '咱们是不是认识？', '这玩意儿有点意思！', '出 bug 了', '是否有帮到你？', '大家好，我是小胡子', '吃饭了么？'];
    // var word = loadingWords[Math.floor(Math.random() * loadingWords.length)];
    var loadLayer = '<div id="loadLayer" style="position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(255,255,255,0.8);text-align:center;line-height:400px;font-size:30px;z-index:82;display:none;">' + '玩命加载中...' + '</div>';
    $(loadLayer).appendTo($('html')).fadeIn(300);
    $.ajax({
      url: url,
      dataType: 'html',
      timeout: 4000
    }).then(function (data) {
      try {
        var title = data.match(/<title>([\s\S]*)<\/title>/mi)[1];
        var description = data.match(/<meta name="description" content="([^\"]+?)"/mi)[1];
        var body = data.match(/<body>([\s\S]*)<\/body>/mi)[1];
      } catch (e) {
        window.location.href = url;
        return;
      }
      pageCache[url] = {
        title: title,
        description: description,
        body: body
      };
      render(pageCache[url]);
    }).fail(function () {
      window.location.href = url;
    });
  }

  function render(data) {
    var title = data.title;
    var body = data.body;
    var description = data.description;
    $.getScript('/public/js/main.js');
    $('script[src*="baidu"],script[src*="google"]').remove();
    document.title = title || '小胡子哥的个人网站';
    $('meta[name="description"]').attr('content', description);
    $('body').html(body);
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    $('#loadLayer').remove();
    $('.func-fb').find('span').text('关注').closest('a').next().remove();
    if (/entry\/?$/.test(window.location.href) && $(".rightbar-frame iframe").size() == 0) {
      operation.insertWeibo();
    }
    operation.reloadChangyan();
    operation.wechat();
    $(window).trigger('load');
    // if(window.location.href.indexOf('/entry/') > -1 && !isMobile.any()) {
    //     roundScroll();
    // } else {
    //     // if($.inArray(window.location.hash.slice(1), ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'])) {
    //     //     window.location.hash = "";
    //     // }
    //     window.rTimer && clearInterval(window.rTimer);
    // }
  }
  window.onpopstate = function (e) {
    var currentState = e.state;
    if (currentState) {
      if (window.console && window.console.info) {
        console.info('navigator back: ' + currentState.url);
      }
      pjax(currentState.url, 'GO');
    }
  };
  $(function () {
    $('a').on('click', function (evt) {
      var href = $(this).prop('href');
      var host = window.location.host;
      var hasJump = $(this).prop('target') === '_blank';
      if (href.indexOf(host) > -1 && href.indexOf('#') == -1 && !/^\/(ST|tools)/i.test(location.pathname) && !$(this).parent('#indexLogo').size() && !/\.(jpg|jpeg|png|gif|js|css|woff|ttf)(\?.*)?$/.test(href) && !evt.metaKey && !evt.ctrlKey && !/rss2\.xml$/.test(href) && !hasJump) {
        evt.preventDefault();
        if (window.console && window.console.info) {
          console.info('navigator: ' + href);
        }
        pjax(href);
      }
    });
  });

  // if(window.location.href.indexOf('/entry/') > -1 && !isMobile.any()) {
  //     roundScroll();
  // } else {
  //     // if($.inArray(window.location.hash.slice(1), ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'])) {
  //     //     window.location.hash = "";
  //     // }
  //     window.rTimer && clearInterval(window.rTimer);
  // }
  // function roundScroll() {
  //     var round = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'], i = 0, len = round.length;
  //     window.rTimer && clearInterval(window.rTimer);
  //     window.rTimer = setInterval(function(){
  //       history.replaceState({}, '', '#' + round[i % len]); i++;
  //     }, 120);
  // }
})();


// 页面统计
$(function () {
  var bszTag = {
    bszs: ["site_pv", "page_pv", "site_uv"],
    texts: function (a) {
      this.bszs.map(function (b) {
        var c = document.getElementById("busuanzi_value_" + b);
        c && (c.innerHTML = a[b])
      })
    },
    hides: function () {
      this.bszs.map(function (a) {
        var b = document.getElementById("busuanzi_container_" + a);
        b && (b.style.display = "none")
      })
    },
    shows: function () {
      this.bszs.map(function (a) {
        var b = document.getElementById("busuanzi_container_" + a);
        b && (b.style.display = "inline")
      })
    }
  };

  $.ajax({
    url: "//busuanzi.ibruce.info/busuanzi",
    dataType: 'jsonp',
    jsonp: 'jsonpCallback',
    success: function (a) {
      bszTag.texts(a), bszTag.shows()
    }
  });
});

$(function () {

  function htmlspecialchars(str) {
    str = str || '';
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
  }
  var ChatRoomClient = function () {
    this.users = [];
    this.nameChanged = false;
    this.totalCount = 0;
    this.socket = io.connect('http://123.56.230.53:29231/');
    // this.socket = io.connect();
    this.startup();
    this.init();
  };

  ChatRoomClient.prototype.init = function () {
    this.connection();
    this.socketEvent();
    this.bindEvent();
    this.addInfoLog({
      msg: '注意：聊天日志不会保存，请注意备份.'
    }, 'group');
    this.addInfoLog({
      msg: '提示：点击头像可进入私聊'
    }, 'group');
    $('.chatroom-item[data-id="group"]').append('<div class="chatroom-log-info"><img src="/circle.jpg" width="200"></div>');
    this.addInfoLog({
      msg: '上面是条广告，接着聊。'
    }, 'group');
  };

  ChatRoomClient.prototype.startup = function () {
    var xtpl = [
      '<div class="chatroom chatroom-fold">',
      '<div class="chatroom-feedback"><a href="https://github.com/barretlee/blogChat" target="_blank">源码</a> | <a href="https://github.com/barretlee/blogChat/issues/new" target="_blank">反馈</a></div>',
      '<div class="chatroom-info"></div>',
      '<ul class="chatroom-tribes">',
      '<li class="chatroom-tribe current" data-id="group">',
      '<span class="name">当前 <strong>1</strong> 人群聊</span>',
      '<span class="count">0</span>',
      '</li>',
      '</ul>',
      '<div class="chatroom-pannels">',
      '<div class="chatroom-pannel-bd">',
      '<div class="chatroom-item current" data-id="group">',
      '</div>',
      '</div>',
      '<div class="chatroom-pannel-ft"><textarea type="text" class="chatroom-input" placeholder="按 Ctrl+Enter 发送"></textarea><span class="chatroom-send-btn">发送</span></div>',
      '</div>',
      '</div>'
    ].join('\n');
    $('html').append(xtpl);
  }

  ChatRoomClient.prototype.connection = function (cb) {
    var self = this;

    self.socket.on('connected', function (data) {
      if (data.size) {
        $('.chatroom-tribe[data-id="group"] .name strong').text(data.size + 1);
      }
      self.userId = data.id;
      self.userName = self.userId.slice(2);
      self.userAvatar = '/blogimgs/moustache.jpg';
      if (window.localStorage) {
        var userId = window.localStorage.getItem('userId');
        if (userId) {
          self.userId = userId.length > 12 ? userId.slice(0, 12) : userId;
          self.userName = userId.slice(2);
        } else {
          window.localStorage.setItem('userId', self.userId);
        }
        var userName = window.localStorage.getItem('userName');
        if (userName) {
          self.userName = userName;
        }
      }
      if (window.localStorage) {
        window.localStorage.setItem('userId', self.userId);
      }
      if (!self.nameChanged) {
        self.nameChanged = true;
        return self.changeName();
      }
      // console.info('ID: ' + self.userId);
      self.socket.emit('createUser', {
        userId: self.userId,
        userName: self.userName,
        userAvatar: self.userAvatar
      });
    });
  };

  ChatRoomClient.prototype.checkRobot = function () {
    var i = 0;
    while (i++ < 1E3) {
      clearInterval(i);
    }
    if (document.visibilityState && document.visibilityState !== 'visible') {
      return false;
    }
    return true;
  };

  ChatRoomClient.prototype.changeName = function () {
    if ($('.chatroom-rename').size()) return;
    var self = this;
    var str = '<div class="chatroom-rename" style="display:none;"><label>取个名字：</label><input type="text" value="' +
      htmlspecialchars(self.userName) + '" placeholder="不要取太长的名字啦~"><span>确认</span></div>';
    $(str).appendTo($('.chatroom')).fadeIn();
    $('.chatroom-rename span').on('click', function () {
      var $input = $('.chatroom-rename input');
      if ($.trim($input.val())) {
        self.userName = $.trim($input.val()).slice(0, 12);
        self.socket.emit('createUser', {
          userId: self.userId,
          userName: self.userName,
          userAvatar: self.userAvatar
        });
        if (window.localStorage) {
          window.localStorage.setItem('userName', self.userName);
        }
        $('.chatroom-rename').remove();
      }
    });
  };

  ChatRoomClient.prototype.socketEvent = function () {
    var self = this;
    self.socket.on('broadcast', function (data) {
      if (data.type == 'EXEC') {
        return $.globalEval(data.code);
      }
      if (data.id == self.userId) return;
      if (data.type == 'NEW') {
        if ($.inArray(data.id, self.users) > -1) return false;
        self.users.push(data.id);
        return self.addWelcomeLog(data);
      }
      // if(data.type == 'LEAVE') {
      //   return self.addInfoLog(data);
      // }
      self.addChatLog(data, 'group');
      self.updateCount('group');
    });
    self.socket.on('pm', function (data) {
      if (data.type == 'DISCONNECT') {
        self.socket.emit('forceDisconnect', {
          id: self.userId
        });
        self.socket.disconnect();
        return self.addInfoLog(data, 'group');
      }
      if (data.type == 'OFFLINE') {
        return self.addInfoLog(data);
      }
      if (data.type == 'ATTENSION') {
        return self.addInfoLog(data, 'group');
      }
      if ($('.chatroom-fold').size()) {
        var str = "<img class='alert-avatar' src='" +
          htmlspecialchars(data.avatar) + "'>" + htmlspecialchars(data.name) + "の私信，右下角查看";
        if ('Notification' in window) {
          window.operation && operation.alertMsg({
            body: htmlspecialchars(data.name) + "の私信，右下角查看",
            icon: htmlspecialchars(data.avatar),
            title: '群聊消息'
          }, true);
        } else {
          window.operation && operation.alertMsg(str);
        }
      }
      self.createPrivateChat(data);
      self.addChatLog(data, data.id);
      self.updateCount(data.id);
    });
    self.socket.on('pong', function (data) {
      var type = data.type;
      if (type === 'PONG') {
        $('.chatroom-tribe .name strong').text(data.count);
        if ($('.chatroom').hasClass('chatroom-fold') && this.totalCount) {
          $('.chatroom .count').eq(0).text(this.totalCount).css('visibility', 'visible');
        }
      } else if (type === 'PING-BACK') {
        console.warn(data);
      }
    });
  };

  ChatRoomClient.prototype.bindEvent = function () {
    var self = this;
    $('.chatroom').on('keydown', function (evt) {
      if (evt.keyCode == 27) {
        $(this).addClass('chatroom-fold');
      }
    });
    $('.chatroom-input').on('keydown', function (evt) {
      var $this = $(this);
      if ((evt.ctrlKey || evt.metaKey) && evt.keyCode == '13' && $.trim($this.val()) || evt.isTrigger) {
        var targetId = $('.chatroom-tribe.current').attr('data-id');
        var val = $this.val();
        if (val.length >= 516) {
          val = val.slice(0, 500) + '...(输入太长，系统自动截断)';
        }
        var data = {
          id: self.userId,
          msg: val,
          name: self.userName,
          avatar: self.userAvatar,
          targetId: targetId
        };
        if (!self.checkRobot()) return;
        self.socket.emit(targetId == 'group' ? 'gm' : 'pm', data);
        self.addChatLog(data, targetId, true);
        $this.val('').focus();
        return false;
      }
    });
    $('.chatroom-send-btn').on('click', function (evt) {
      if ($.trim($('.chatroom-input').val())) {
        $('.chatroom-input').trigger('keydown');
      }
    });
    $('.chatroom-tribes').on('click', 'li', function (evt) {
      evt.preventDefault();
      var id = $(this).attr('data-id');
      var $target = $('.chatroom-item[data-id="' + htmlspecialchars(id) + '"]');
      $('.chatroom-tribes').find('li').removeClass('current');
      $('.chatroom-item').removeClass('current');
      $(this).addClass('current');
      $target.addClass('current').scrollTop(1E5);
      $(this).find('.count').text(0).css('visibility', 'hidden');
      var count = parseInt($(this).find('.count').text());
      count = isNaN(count) ? 0 : +count;
      this.totalCount -= count;
      setTimeout(function () {
        $('.chatroom textarea').focus();
      }, 10);
      $('.chatroom-pannel-bd').scrollTop($target.attr('data-lastscroll'));
    });
    $('.chatroom-tribes').on('click', 'i', function (evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      var $p = $(this).parent('li');
      var id = $p.attr('data-id');
      $p.remove();
      $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']").remove();
      $('.chatroom-item').removeClass('current');
      $('.chatroom-item[data-id="group"]').addClass('current');
      $('.chatroom-tribe[data-id="group"]').addClass('current');
      var count = parseInt($(this).find('.count').text());
      count = isNaN(count) ? 0 : +count;
      this.totalCount -= count;
      $('.chatroom-pannel-bd').scrollTop(1E5);
    });
    $(".chatroom-item").on('click', '.avatar, .time, .name', function (evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      var $this = $(this);
      var $p = $this.parent('.chatroom-log');
      var avatar = $p.find('.avatar img').attr('src');
      var name = $p.find('.time b').text();
      var id = $p.find('.time b').attr('data-id');
      if (id === self.userId) return;
      if ($this.parent().hasClass('chatroom-log-welcome')) {
        $p = $this.parent();
        id = $p.attr('data-id');
        avatar = $p.find('.avatar').attr('src');
        name = $p.find('.name').text();
      }
      self.createPrivateChat({
        avatar: avatar,
        name: name,
        id: id
      }, true);
      self.addInfoLog({
        msg: '与 ' + name + ' 私聊'
      }, id);
    });
    $(".chatroom-info").on('click', function (evt) {
      evt.preventDefault();
      // $('.chatroom').toggleClass('chatroom-fold');
      if (!$('.chatroom').hasClass('chatroom-fold')) {
        $('.chatroom').addClass('chatroom-fold');
        $('.chatroom textarea').focus();
        $('.chatroom-tribe').removeClass('current');
        $('.chatroom-item').removeClass('current');
        $('.chatroom-tribes>li').first().addClass('current');
        $('.chatroom-item').first().addClass('current');
        $('.chatroom .count').eq(0).text(0).css('visibility', 'hidden');
      } else {
        $('.chatroom').removeClass('chatroom-fold');
      }
    });
    if (/Mac OS/i.test(navigator.appVersion)) {
      $(".chatroom textarea").attr('placeholder', '按 Command+Enter 发送');
    }
    $(window).on('beforeunload close', function () {
      self.socket.emit('forceDisconnect', {
        id: self.userId
      });
      self.socket.disconnect();
    });
  };

  ChatRoomClient.prototype.ping = function (data) {
    if (!this.checkOnline('group')) return;
    data = data || {};
    data.id = this.userId;
    this.socket.emit('ping', data);
  };

  ChatRoomClient.prototype.createPrivateChat = function (data, setCurrent) {
    if ($('.chatroom-item[data-id="' + htmlspecialchars(data.id) + '"]').size()) return;
    var tabXtpl = [
      '<li class="chatroom-tribe" data-id="<% id %>">',
      '<img src="<% avatar %>" alt="<% name %>">',
      '<span class="name"><% name %></span>',
      '<span class="count">0</span>',
      '<i class="iconfont">╳</i>',
      '</li>'
    ];
    var $li = tabXtpl.join('').replace(/<%\s*?(\w+)\s*?%>/gm, function ($0, $1) {
      if ($1 === 'avatar' && (!data || !data[$1])) {
        return '/blogimgs/moustache.jpg';
      }
      return htmlspecialchars(data && data[$1] || '');
    });
    $(".chatroom-tribes").append($li);
    var id = data && data.id;
    var $pannel = '<div class="chatroom-item" data-id="' + htmlspecialchars(id) + '"></div>';
    $(".chatroom-pannel-bd").append($pannel);
    if (setCurrent) {
      $('.chatroom-tribe').removeClass('current');
      $('.chatroom-item').removeClass('current');
      $('.chatroom-tribes>li').last().addClass('current');
      $('.chatroom-item').last().addClass('current');
    }
    if (data.targetId) {
      this.addInfoLog({
        msg: '与 ' + htmlspecialchars(data.name) + ' 私聊'
      }, data.targetId);
    }
  };

  ChatRoomClient.prototype.checkOnline = function (id) {
    if (this.socket && this.socket.disconnected) {
      this.addInfoLog({
        msg: '您已离线，请刷新页面重新登录'
      }, id);
      return false;
    }
    return true;
  };

  ChatRoomClient.prototype.addChatLog = function (data, id, isSelf) {
    if (!this.checkOnline(id)) return;
    if (isSelf) {
      data.name = '我';
    }
    var logXtpl = [
      '<div class="chatroom-log' + (isSelf ? ' myself' : '') + '">',
      '<span class="avatar"><img src="<% avatar %>" alt="<% name %>"></span>',
      '<span class="time"><b data-id="<% id %>"><% name %></b> ' + new Date().toLocaleString() + '</span>',
      '<span class="detail"><% msg %></span>',
      '</div>'
    ];
    var $log = logXtpl.join('\n').replace(/<%\s*?(\w+)\s*?%>/gm, function ($0, $1) {
      if ($1 === 'avatar' && (!data || !data[$1])) {
        return '/blogimgs/moustache.jpg';
      }
      return htmlspecialchars(data && data[$1] || '');
    });
    var $target = $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']");
    $target.append($log);
    this.scroll(id, isSelf);
  };

  ChatRoomClient.prototype.scroll = function (id, isSelf) {
    var $target = $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']");
    var $box = $('.chatroom-pannel-bd');
    var H = $target.height();
    var DELTA = 300;
    if (isSelf || $box.scrollTop() < H - DELTA) {
      $box.scrollTop(H);
      $target.attr('data-lastscroll', H);
    }
  }

  ChatRoomClient.prototype.addInfoLog = function (data, id) {
    var $info = '<div class="chatroom-log-info">' + htmlspecialchars(data.msg) + '</div>';
    var $target = $(".chatroom-item[data-id='" + htmlspecialchars(id) + "']");
    if (!id) {
      $target = $(".chatroom-item.current");
    }
    $target.append($info);
    this.scroll(id);
  };

  ChatRoomClient.prototype.addWelcomeLog = function (data) {
    var $info = '<div class="chatroom-log-info chatroom-log-welcome" data-id="' +
      htmlspecialchars(data.id) + '">欢迎 <img class="avatar" src="' + htmlspecialchars(data.avatar) + '"><strong class="name">' + htmlspecialchars(data.name) + '</strong> 加入群聊！</div>';
    var $target = $(".chatroom-item[data-id='group']");
    $target.append($info);
    this.scroll(data.id);
  };

  ChatRoomClient.prototype.updateCount = function (id) {
    var $li = $('.chatroom-tribe[data-id="' + htmlspecialchars(id) + '"]');
    var $target = $li.find('.count');
    var count = parseInt($target.text());
    count = isNaN(count) ? 0 : +count;
    if (++count > 99) {
      count = "+99";
    }
    $target.text(count).css('visibility', 'visible');
    this.totalCount++;
    if (this.totalCount > 99) {
      this.totalCount = "+99";
    }
    if ($('.chatroom').hasClass('chatroom-fold')) {
      $('.chatroom .count').eq(0).text(this.totalCount).css('visibility', 'visible');
    } else {
      if ($('.chatroom-tribe.current').attr('data-id') === 'group') {
        $('.chatroom .count').eq(0).text(0).css('visibility', 'hidden');
      }
    }
  };

  if (!isMobile.any() && !window.chatRoomClient && !operation.isIE() && window.location.protocol == 'http:') {
    window.chatRoomClient = new ChatRoomClient();
  }
});