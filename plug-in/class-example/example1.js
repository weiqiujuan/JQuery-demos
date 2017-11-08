/**
 * Created by weiqiujuan on 17-11-8.
 */
//1.直接给jquery添加全局函数　　　
jQuery.myAlertOne = function (str) {
    alert(str);
};
//2.用extend()方法
jQuery.extend({
    myAlertTwo: function (str) {
        alert(str);
    },
    myAlertThree: function (str) {
        alert(str);
    }
});
//3.使用命名空间
jQuery.weiqiujuan = {
    myAlertFour: function (str) {
        alert(str);
    }
}