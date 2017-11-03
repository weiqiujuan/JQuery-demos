/**
 * Created by weiqiujuan on 17-11-3.
 */
$(document).ready(function () {
    let vh = $(window).height;
    let vw = $(window).width;

    let imgH = $(".wrap img").height();
    let imgW = $(".wrap img").width();

    let beginX = vw * 2 / 10;
    let endX = beginX + imgW;
    let beginY = (vh - imgH) / 2;
    let endY = beginY + imgH;
    $(".wrap").css("margin-top", beginY + "px");

    //鼠标经过
    document.addEventListener("mousemove", loupe, false);
    //触屏模式触发
    document.addEventListener("touchmove", loupe, false);
    document.addEventListener("touchstart", loupe, false);
    document.addEventListener("touochend", function () {
        $(".loupe").css("visibility", "hidden");
    }, false);

    function loupe(e) {
        let x, y;
        if (e.type !== "mousemove") {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        }
        //如果支持触摸事件，则屏蔽鼠标经过事件，避免影响touchstart的效果
        else if ("ontouchend" in document) {
            return false;
        }
        //如果不支持触摸事件，则让鼠标经过事件正常触发
        else {
            x = e.clientX;
            y = e.clientY;
        }
        if (x > beginX && x < endX && y > beginY && y < endY) {
            let mx = 100 - (x - beginX) / imgW * 1920//1920为原图宽度
            let my = 100 - (y - beginY) / imgH * 1200//1200为原图高度

            let bg = "url(http://wx.karlew.com/loupe/img/pic.jpg) " + mx + "px" + my + "px no-repeat #fff";
            $(".loupe").css("left", x - 103 + "px").css("top", y - 103 + "px").css("background", bg);
            $(".loupe").css("visibility", "visible");
        } else {
            $(".loupe").css("visibility", "hidden");
        }
    }

});
