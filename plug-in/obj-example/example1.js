/**
 * Created by weiqiujuan on 17-11-8.
 */
;(function ($) {
    $.fn.plugin = function (options) {
        let defaults = {
            //各种参数和属性
        };
        let options = $.extend({},defaults, options);
        this.each(function () {
            //实现功能的代码
        });
    };
})(jQuery);