
/**
 * Created by weiqiujuan on 17-10-21.
 */
$(function () {
    ntime = new Date();
    function hxcdqyf() {//创建当前月份函数并返回值
        return nowm = ntime.getMonth();
    };
    function hxcdqnf() {//创建当前年份函数并返回值
        return nowy = ntime.getFullYear();
    };
    function yuefen(hxc_m, hxc_y) {//创建日历函数，并给予两个变量（变量月份和变量年份），为了实现月份的递增和递减按钮的实现
        nowm = hxc_m;
        nowy = hxc_y;
        var $hxctable = "<table class='hxcrltable' cellpadding='0' cellspacing='0'></table>";
        $(".div2").html($hxctable);//可置入任何元素内，$("所需要放入元素的class名（ID名什么均可）")，采用jQuery选择器方式
        $myrqtable = $(".hxcrltable");
        var $hxcToprq = "<tr><td style='cursor: pointer' class='hxcrljian'>-</td><td class='hxcdqsjxs' colspan='5'><span></span>年<span></span>月</td><td style='cursor: pointer' class='hxcrljia'>+</td></tr>";
        $($hxcToprq).appendTo($myrqtable);
        var $hxctheader1 = "<tr><td>周日</td><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td></tr>";
        $($hxctheader1).appendTo($myrqtable);

        function isleapyear(year) {//判断该年是否为闰年的函数，并返回值
            return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
        };
        var nowd = ntime.getDate();
        var n1time = new Date(nowy, nowm, 1);//获取当月第一天
        var firstday = n1time.getDay();//获取当月第一天是周几
        var month_dnarr = [31, 28 + isleapyear(nowy), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//建立1-12月份的天数数组
        var tr_num = Math.ceil((month_dnarr[nowm] + firstday) / 7);//获取当月所需行数
        for (i = 0; i < tr_num; i++) {//循环行数
            var $hxcrltr = "<tr class='hxcrltr" + i + "'></tr>";
            $($hxcrltr).appendTo($myrqtable);
            for (k = 0; k < 7; k++) {//循环单元格
                tdnum = i * 7 + k;
                date_str = tdnum - firstday + 1;
                (date_str <= 0 || date_str > month_dnarr[nowm]) ? date_str = "&nbsp;" : date_str = tdnum - firstday + 1;
                date_str == nowd ? ($hxcrltd = "<td bgcolor='#6F524A' style='color:white'>" + date_str + "</td>") : ($hxcrltd = "<td>" + date_str + "</td>");//判断是否为当天，并高亮显示，如修改可直接修改td内联样式即可
                $($hxcrltd).appendTo($(".hxcrltr" + i));
                $(".hxcrltable tr:not(:lt(2)) td").each(function () {//遍历该table中全部td，当月所有已过日期，灰色显示
                    if (date_str < nowd) {
                        $(this).css("color", "#CCCCCC");//当月所有已过日期颜色样式可在此处修改
                    }
                });
            }
        }

        $(".hxcdqsjxs span:first").text(nowy);//头部显示当年的年份
        $(".hxcdqsjxs span:last").text(nowm + 1);//头部显示当年的月份，+1提示：获取当前月份是从0开始计算（0-11），所以这里要加1

        function hxcdtdqyf() {//获取所显示月份函数，并返回值
            return parseInt($(".hxcdqsjxs span:last").text());
        };
        function hxcdtdqnf() {//获取所显示年份函数，并返回值
            return parseInt($(".hxcdqsjxs span:first").text());
        };
        $(".hxcrljian").click(function () {//点按月份递减按钮事件，月份递增，逢12月自动加载到下一年1月；详细请参考下面递增按钮介绍介绍
            var dtm_jian = hxcdtdqyf() - 1;
            var dty_jian = hxcdtdqnf();
            if (dtm_jian > 0) {
                dtm_jian -= 1;
            } else {
                dtm_jian = 11;
                dty_jian -= 1;
            }
            ;
            yuefen(dtm_jian, dty_jian);//点按后加载改变后的年份和月份
        });
        $(".hxcrljia").click(function () {//点按月份递增按钮事件，月份递增，逢12月自动加载到下一年1月
            var dtm_jia = hxcdtdqyf() - 1;//动态获取当前所显示月份，前面算法中月份已经加1，所以这里要减去
            var dty_jia = hxcdtdqnf();//动态获取当前所显示年份
            if (dtm_jia < 11) {//如当前所示月份小于11，月份自减1
                dtm_jia += 1;
            } else {//如大约11，月份变成0并年份自增1
                dtm_jia = 0;
                dty_jia += 1;
            }
            ;
            yuefen(dtm_jia, dty_jia);//点按后加载改变后的年份和月份
        });
    };
    yuefen(hxcdqyf(), hxcdqnf());//页面加载时添加当前月份和年份
})(jQuery);
/*
/!**
 * Created by weiqiujuan on 17-10-21.
 *!/
$(function () {
    nowTime = new Date();
    function nMonth() {//创建当前月份函数并返回值
        return nowM = nowTime.getMonth();
    }

    function nYear() {//创建当前年份函数并返回值
        return nowY = nowTime.getFullYear();
    }

    function yuefen(m, y) {//创建日历函数，并给予两个变量（变量月份和变量年份），为了实现月份的递增和递减按钮的实现
        nowM = m;
        nowY = y;
        let $hxctable =  "<table class='hxcrltable' cellpadding='0' cellspacing='0'></table>";
        $(".div2").html($hxctable);
        $myrqtable = $(".hxcrltable");

        let $hxcToprq = "<tr><td style='cursor: pointer' class='hxcrljian'>-</td><td class='hxcdqsjxs' colspan='5'><span></span>年<span></span>月</td><td style='cursor: pointer' class='hxcrljia'>+</td></tr>";
        $($hxcToprq).appendTo($myrqtable);

        let $hxctheader1 = "<tr><td>周日</td><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td></tr>";
        $($hxctheader1).appendTo($myrqtable);

        function islespYear(year) {//判断该年是否为闰年
            return (year % 100 === 0 ? res = (year % 400 === 0 ? 1 : 0) : res = (year % 4 === 0 ? 1 : 0));
        }
        let nowD = nowTime.getDate();
        let n1time = new Date(nowY, nowM, 1);//获取当月第一天
        let firstday = n1time.getDay();//获取当月第一天星期
        let month_dnarr = [31, 28 + islespYear(nowY), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let tr_num = Math.ceil((month_dnarr[nowM] + firstday) / 7);
        for (let i = 0; i < tr_num; i++) {//循环行数
            let $hxcrltr = "<tr class='hxcrltr" + i + "'></tr>";
            $($hxcrltr).appendTo($myrqtable);
            for (let k = 0; k < 7; k++) {//循环单元格
                tdnum = i * 7 + k;
                date_str = tdnum - firstday + 1;
                (date_str <= 0 || date_str > month_dnarr[nowM]) ? date_str = "&nbsp;" : date_str = tdnum - firstday + 1;
                date_str == nowD ? ($hxcrltd = "<td bgcolor='#6F524A' style='color:white'>" + date_str + "</td>") : ($hxcrltd = "<td>" + date_str + "</td>");//判断是否为当天，并高亮显示，如修改可直接修改td内联样式即可//判断是否为当天，并且高亮显示，如修改可直接修改td内联样式即可
                $($hxcrltd).appendTo($(".hxcrltr" + i));
                $(".hxcrltable tr:not(:lt(2)) td").each(function () {
                    if (date_str < nowD) {
                        $(this).css("color", "#cccccc");
                    }
                });
            }
        }

        $(".hxcdqsjxs span:first").text(nowY);//头部显示当年年份
        $(".hxcdqsjxs span:last").text(nowM + 1);//头部显示当年的月份

        function hxcdtdqyf() {//月份
            return parseInt($(".hxcdqsjxs span:last").text());
        }

        function hxcdtdqnf() {//年份
            return parseInt($(".hxcdqsjxs span:last").text());
        }
        $(".hxcrljian").click(function () {//点按月份递减按钮事件，月份递增，逢12月自动加载到下一年1月；详细请参考下面递增按钮介绍介绍
            let dtm_jian = hxcdtdqyf() - 1;
            let dty_jian = hxcdtdqnf();
            if (dtm_jian > 0) {
                dtm_jian -= 1;
            } else {
                dtm_jian = 11;
                dty_jian -= 1;
            }
            yuefen(dtm_jian, dty_jian);//点按后加载改变后的年份和月份
        });
        /!*$(".hxcrljian").click(function () {
            let dtM_jian = hxcdtdqMf() - 1;
            let dtY_jian = hxcdtdqYf();
            if (dtM_jian > 0) {
                dtM_jian -= 1;
            } else {
                dtM_jian = 11;
                dtY_jian -= 1;
            }
            yuefen(dtM_jian, dtY_jian);//点按后加载改变后的月份和年份
        });*!/
      /!*  $(".hxcrljia").click(function () {
            let dtM_jia = hxcdtdqMf() - 1;
            let dtY_jia = hxcdtdqYf();
            if (dtM_jia < 11) {
                dtM_jia += 1;
            } else {//如果大于１１，月份变为０并且年份自增１
                dtM_jia = 0;
                dtY_jia += 1;
            }
            yuefen(dtM_jia, dtY_jia);//点按后加载改变后的年份和月份
        });*!/
        $(".hxcrljia").click(function () {//点按月份递增按钮事件，月份递增，逢12月自动加载到下一年1月
            let dtm_jia = hxcdtdqyf() - 1;//动态获取当前所显示月份，前面算法中月份已经加1，所以这里要减去
            let dty_jia = hxcdtdqnf();//动态获取当前所显示年份
            if (dtm_jia < 11) {//如当前所示月份小于11，月份自减1
                dtm_jia += 1;
            } else {//如大约11，月份变成0并年份自增1
                dtm_jia = 0;
                dty_jia += 1;
            }
            yuefen(dtm_jia, dty_jia);//点按后加载改变后的年份和月份
        });
    }
    yuefen(nMonth(), nYear());//页面加载时添加当前年份和月份
})(jQuery);*/
