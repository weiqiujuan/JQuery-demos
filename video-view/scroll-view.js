$(function () {
    let page = 1;
    let i = 4;
    $("span.next").click(function () {
        let $parent = $(this).parent("div.v_show");//找到他的父元素
        let $v_show = $parent.find("div.v_content_list");//找到显示的列表
        let $v_content = $parent.find("div.v_content");//找到显示内容的父元素

        let v_width = $v_content.width();//获取内容的宽度
        let len = $v_show.find("li").length;//获取组图的长度
        let page_count = Math.ceil(len / i);//判断页面长度
        if (!$v_show.is(":animated")) {
            if (page === page_count) {
                $v_show.animate({
                    left: "0px"//通过改变left的直，跳转到第一个版页
                }, "slow");
                page = 1;
            } else {
                $v_show.animate({
                    left: '-=' + v_width
                }, "slow");
                page++;
            }
        }
        $parent.find('span').eq((page - 1)).addClass("current").siblings().removeClass('current');
    });
    $("span.pre").click(function () {
        let $parent = $(this).parents("div.v_show");//根据当前点击元素获取到父元素
        let $v_show = $parent.find("div.v_content_list"); //寻找到“视频内容展示区域”
        let $v_content = $parent.find("div.v_content"); //寻找到“视频内容展示区域”外围的DIV元素
        let v_width = $v_content.width();
        let len = $v_show.find("li").length;
        let page_count = Math.ceil(len / i);   //只要不是整数，就往大的方向取最小的整数
        if (!$v_show.is(":animated")) {    //判断“视频内容展示区域”是否正在处于动画
            if (page === 1) {  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
                $v_show.animate({left: '-=' + v_width * (page_count - 1)}, "slow");
                page = page_count;
            } else {
                $v_show.animate({left: '+=' + v_width}, "slow");
                page--;
            }
        }
        $parent.find("span").eq((page - 1)).addClass("current").siblings().removeClass("current");
    });
});