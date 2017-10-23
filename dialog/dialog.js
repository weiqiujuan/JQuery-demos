(function ($) {
    function EasyDialog(ele, options) {
        this.ele = ele;
        this.setting = {
            width: 300,
            height: 400,
            borderRadius: 0,
            boxShadow: "0 3px 15px rgba(0, 0, 0, .4), 0 0 5px rgba(0, 0, 0, .4)",
            msg: "hello weiqiujuan",
            title: "标题",
            type: "alert",
            seconds: 5,
            effect: "default",
            buttons: ["确定"],
            buttonClass: ["danger", "warning", "success", "primary", "default"],
            content: "我是被弹出的内容",
            callback: function () {
            },
            isDrag: false
        };
        this.config = null;
        this.options = options;
    }

    EasyDialog.prototype = {
        init: function (options) {
            var config = this.config = $.extend(this.setting, this.options);
            var body = $("body");
            var dialogBox = $("<div class='dialogBox'></div>");
            var dialogContent = $("<div class='dialogContent'></div>");

            function createHTML() {
                if ($(".dialogBox").length == 0) dialogBox.appendTo(body);
                dialogBox.css({
                    width: config.width,
                    height: config.height,
                    background: "#fff",
                    border: "1px solid #d9d9d9",
                    borderRadius: config.borderRadius,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    marginLeft: (/\%/g).test(config.width) ? -parseInt(config.width) / 2 + "%" : -config.width / 2,
                    marginTop: (/\%/g).test(config.height) ? -parseInt(config.height) / 2 + '%' : -config.height / 2,
                    boxShadow: config.boxShadow,
                    transform: "translate(0,0)",
                });
                if ($(".dialogContent").length === 0) dialogContent.appendTo(dialogBox);
                if ($(".dialogMask").length === 0) {
                    dialogBox.wrap('<div class="dialogMask"></div>')
                } else {
                    $(".dialogMask").show();
                }
            }

            var _this = this;
            var speed = config.effect == 'default' ? 0 : 200;
            this.ele.on("click", function () {
                createHTML();
                if (config.type == 'alert') {
                    $(".dialogTitle").remove();
                    if (config.msg.replace(/^\s+|\s+$/g, "") != "") {
                        if ($(".dialogContentText").length == 0) $("<div class='dialogContentText'>" + config.msg + "</div>").appendTo($(".dialogContent"));
                    } else {
                        alert("msg参数设置不能为空");
                        return;
                    }
                    // 定时关闭
                    if ($.isArray(config.buttons) == true && config.buttons.length > 0) {
                        if ($(".dialogButtons").length == 0) {
                            $("<div class='dialogButtons'></div>").appendTo($(".dialogContent"));
                            var html = '';
                            for (var i = 0; i < config.buttons.length; i++) {
                                html += "<a href='javascript:;' class='" + config.buttonClass[i] + "'>" + config.buttons[i] + "</a>";
                            }
                            $(".dialogButtons").html(html);
                        }
                    } else if (config.buttons.replace(/^\s+|\s+$/g, "") == "") {
                        if ($(".dialogTime").length == 0) $(".dialogContentText").after('<div class=\'dialogTime\' style=\'text-align:center;\'><span>' + config.seconds + '</span>秒后关闭</div>');
                        var s = config.seconds;
                        var timer = null;
                        timer = setInterval(function () {
                            s--;
                            if (s == 0) {
                                clearInterval(timer);
                                _this.effects[config.effect]['eleHide']($(".dialogBox"));
                                setTimeout(function () {
                                    $(".dialogBox").parent().remove();
                                }, 500)
                            }
                            $(".dialogTime span").text(s);
                        }, 1000);
                        $(".dialogTime span").text(config.seconds);
                    } else {
                        alert("buttons参数设置错误，只能设置为数组或空");
                        return;
                    }
                    dialogBox.css({
                        height: 'auto',
                        paddingBottom: parseInt($(".dialogContentText").css("paddingTop")) + 10 + 'px',
                    })
                    dialogBox.css('marginTop', -dialogBox.outerHeight() / 2);
                    $(".dialogMask").addClass('visible');
                    _this.effects[config.effect]['eleShow']($(".dialogBox"));
                    $(".dialogButtons a").click(function () {
                        if (config.callback) config.callback();
                        setTimeout(function () {
                            $(".dialogMask").removeClass('visible');
                        }, speed)
                        _this.effects[config.effect]['eleHide']($(".dialogBox"));
                        setTimeout(function () {
                            $(".dialogBox").parent().remove();
                        }, 500)
                    });
                }
                if (config.type == 'modal') {
                    if (config.title.replace(/^\s+|\s+$/g, "") != "") {
                        if ($(".dialogTitle").length == 0)
                            $("<div class='dialogTitle'>" + config.title + "</div>").insertBefore($(".dialogContent"));
                    }
                    if ($(".dialogcloseBtn").length == 0) $("<a href='javascript:;' class='dialogcloseBtn' >&#215</a>").appendTo($(".dialogBox"));
                    if (/^[#\.]\w+/g.test(config.content.replace(/^\s+|\s|$/g, ""))) {
                        $(".dialogContent").html($(config.content).html());
                    } else if (config.content.replace(/^\s+$/g, "") == "") {
                        alert('参数设置不能为空！');
                        dialogBox.parent().remove();
                        return;
                    } else if (/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(config.content)) {
                        var html = "";
                        html += "<iframe src='" + config.content + "' width='100%' height='" + (dialogBox.innerHeight() - $(".dialogTitle").outerHeight() - parseInt($(".dialogContent").css("paddingTop")) * 3) + "' frameborder=0  ></iframe>";
                        $(".dialogContent").html(html);
                    } else {
                        if ($(".dialogModalText").length == 0) $("<div class='dialogModalText'></div>").html(config.content).appendTo($(".dialogContent"));
                    }
                    $(".dialogMask").addClass('visible');
                    $(".dialogBox").css("height", config.height)
                    _this.effects[config.effect]['eleShow']($(".dialogBox"));
                    $(".dialogcloseBtn").click(function () {
                        if (config.callback) config.callback();
                        setTimeout(function () {
                            $(".dialogMask").removeClass('visible');
                        }, speed)
                        _this.effects[config.effect]['eleHide']($(".dialogBox"));
                        setTimeout(function () {
                            $(".dialogBox").parent().remove();
                        }, 500)
                    });
                }
                _this.darg();
            })
        },
        effects: {
            "default": {
                eleShow: function (obj) {
                    obj.show();
                },
                eleHide: function (obj) {
                    obj.css({
                        top: '50%',
                        left: '50%',
                        marginLeft: -(obj.outerWidth() / 2),
                        marginTop: -(obj.outerHeight() / 2),
                    })
                }
            },
            "bounceY": {
                eleShow: function (obj) {
                    obj.show();
                    obj.addClass('bounceInDown');
                },
                eleHide: function (obj) {
                    obj.addClass('bounceOutDown');
                    setTimeout(function () {
                        obj.removeClass('bounceOutDown');
                        // 消失后回到中心位置
                        obj.css({
                            top: '50%',
                            left: '50%',
                            marginLeft: -(obj.outerWidth() / 2),
                            marginTop: -(obj.outerHeight() / 2),
                        })
                    }, 500)
                }
            },
            "bounceX": {
                eleShow: function (obj) {
                    obj.show();
                    obj.addClass('bounceInLeft');
                },
                eleHide: function (obj) {
                    obj.addClass('bounceOutRight');
                    setTimeout(function () {
                        obj.removeClass('bounceOutRight');
                        obj.css({
                            top: '50%',
                            left: '50%',
                            marginLeft: -(obj.outerWidth() / 2),
                            marginTop: -(obj.outerHeight() / 2),
                        })
                    }, 500)
                }
            },
            "scale": {
                eleShow: function (obj) {
                    obj.show();
                    obj.addClass('sacleIn');
                },
                eleHide: function (obj) {
                    obj.addClass('sacleOut');
                    setTimeout(function () {
                        obj.removeClass('sacleOut');
                        obj.css({
                            top: '50%',
                            left: '50%',
                            marginLeft: -(obj.outerWidth() / 2),
                            marginTop: -(obj.outerHeight() / 2),
                        })
                    }, 500)
                }
            }
        },
        darg: function () {
            var isDown = false;
            var dargBar = $(".dialogTitle");
            var dargBox = $(".dialogBox");
            // 按下坐标，移动时候的坐标，偏移量，设置的坐标
            var startX, startY, currentX, currentY, distanceX, distanceY, x, y;
            var dragBarLeft, dragBarTop;
            if (this.config.isDrag == true && dargBar) {
                dargBar.on("mousemove", function () {
                    $(this).css("cursor", "move");
                })
                dargBar.on('mousedown', function (event) {
                    isDown = true;
                    startX = event.pageX;
                    startY = event.pageY;
                    dragBarLeft = dargBox.offset().left;
                    dragBarTop = dargBox.offset().top;
                    distanceX = startX - dragBarLeft + $(window).scrollLeft();
                    distanceY = startY - dragBarTop + $(window).scrollTop();
                })
                $(document).on("mousemove", function (event) {
                    if (isDown == true) {
                        currentX = event.pageX;
                        currentY = event.pageY;
                        x = currentX - distanceX;
                        y = currentY - distanceY;
                        var w = $(window).innerWidth() - dargBox.outerWidth();
                        var h = $(window).innerHeight() - dargBox.outerHeight();
                        x = Math.min(w, Math.max(0, x));
                        y = Math.min(h, Math.max(0, y));
                        dargBox.css({
                            left: x,
                            top: y,
                            margin: '0'
                        })
                    } else {
                        return
                    }
                })
                $(document).on("mouseup", function () {
                    isDown = false
                })
            }
        }
    }

    $.fn.easyDialog = function (options) {
        return new EasyDialog(this, options).init();
    }
})(jQuery)
// 调用
$(".btn1").easyDialog()
$(".btn2").easyDialog({
    width: 400,
    msg: '带回调函数的alert弹出框',
    buttons: ['ok'],
    buttonClass: ['success'],
    callback: function () {
        alert("你点击了按钮")
    }
})
$(".btn3").easyDialog({
    width: 400,
    msg: '多个按钮的alert弹出框',
    buttons: ['确定', '取消'],
    buttonClass: ['danger', 'default']
})
$(".btn4").easyDialog({
    buttons: '',
})
$(".btn5").easyDialog({
    width: 500,
    height: 400,
    borderRadius: 10,
    type: 'modal',
    title: "可拖拽的模态框",
    content: '.a',
    effect: 'bounceY',
    isDrag: true

})
$(".btn6").easyDialog({
    width: 800,
    height: 600,
    borderRadius: 10,
    type: 'modal',
    content: 'http://www.w3cfuns.com',
    effect: 'bounceX',
    isDrag: true
})