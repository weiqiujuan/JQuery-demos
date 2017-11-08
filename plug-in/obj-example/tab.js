/**
 * Created by weiqiujuan on 17-11-8.
 */
;(function ($) {
    $.fn.tab = function (options) {
        let defaults = {
            //各种参数和属性
            currentClass: "current",
            tabNav: ".tabNav>li",
            tabContent: ".tabContent>div",
            eventType: "click"
        };
        let options = $.extend({}, defaults, options);
        this.each(function () {
            //实现功能的代码
            let _this = $(this);
            _this.find(options.tabNav).bind(options.eventType, function () {
                $(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
                let index = $(this).index();
                _this.find(options.tabContent).eq(index).show().siblings().hide();
            });
        });
    };
})(jQuery);