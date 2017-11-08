/**
 * Created by weiqiujuan on 17-11-8.
 */

(function ($) {
    $.fn.table = function (options) {
        let defaults = {
            //各种参数和属性
            eventRowClass: 'evenRow',
            oddRowClass: 'oddRow',
            currentRowClass: 'nowRow',
            eventType:"mouseover",
            eventType2:"mouseout"
        };
        let option = $.extend(defaults, options);//合并defaults和options
        this.each(function () {
            //实现功能的代码
            let _this = $(this);
            _this.find("tr:even").addClass(option.evenRowClass);
            _this.find("tr:odd").addClass(option.oddRowClass);
            /*  _this.find("tr").mouserover(function () {
             $(this).addClass(option.currentRowClass);
             }).onmouseout(function () {
             $(this).removeClass(option.currentRowClass);
             });*/
            _this.find("tr").bind(option.eventType, function () {
                $(this).addClass(option.currentRowClass);
            });
            _this.find("tr").bind(option.eventType2, function () {
                $(this).removeClass(option.currentRowClass);
            });
        });
    };
})(jQuery);