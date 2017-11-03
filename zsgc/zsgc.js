/**
 * Created by weiqiujuan on 17-11-3.
 */
$(document).ready(function () {
    let arr = [];
    //view
    $(".view").click(function () {
        //添加遮着层
        let maskHeight = $(document).height();
        let maskWidth = $(document).width();
        $("<div class='mask'></div>").appendTo($("body"));
        $("div.mask").css({
                "opacity": 0.4,
                "background": "black",
                "position": "absolute",
                "left": 0,
                "top": 0,
                "width": maskWidth,
                "height": maskHeight,
                "z-index": 2
            }
        );
        $(this).parent().siblings().each(function () {
            arr.push($(this).text());//this一行内容
        });
        //alert(arr);
        $(".popDiv").show().children().each(function (i) {
            $(this).children("span").text(arr[i]);//i?
        });
        //close
        $(".close").click(function () {
            $(".popDiv").hide();
            $(".mask").remove();
        })
    });
    //delete
    $("a.del").click(function () {
        $(this).parents("tr").remove();
    });
});