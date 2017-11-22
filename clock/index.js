/**
 * Created by weiqiujuan on 17-11-22.
 */
let tool = {

    init: function () {
        this.drawLines($(".line-min"), 60);
        this.drawLines($(".line-hour"), 12);
        this.drawNumber($(".number"));
        this.move();
    },

    drawLines: function (content, total) {
        let angle = 360 / total;
        let str = "";
        for (let i = 0; i < total; i++) {
            str += '<li style="transform: rotate(' + angle * i + 'deg);"></li>'
        }
        content.html(str);
    },

    drawNumber: function (content) {
        let str = '';
        for (let i = 1; i <= 12; i++) {
            str += '<li style="transform: rotate(' + 30 * i + 'deg) translateX(-50%);"><span style="transform: rotate(' + -30 * i + 'deg)">' + i + '</span></li>'
        }
        content.html(str);
    },

    move: function () {
        let _this = this;
        _this.run();
        setInterval(function () {
            _this.run();
        }, 1000);
    },

    run: function () {
        let date = new Date();
        let dateHour = date.getHours();
        let dateMin = date.getMinutes();
        let dateSec = date.getSeconds();
　　　　
        //为什么可以这样算
        let secAngle = dateSec * 6 - 90;//360/(3600/60)
        let minAngle = dateMin * 6 + dateSec * 0.1 - 90;//360/60=6;360/3600=0.1
        let hourAngle = dateHour * 30 + dateMin * 0.5 - 90;//360/12=30;12/60=0.5;12/3600=

        $('.pointer-hour').css('transform', 'rotate(' + hourAngle + 'deg)');
        $('.pointer-min').css('transform', 'rotate(' + minAngle + 'deg)');
        $('.pointer-sec').css('transform', 'rotate(' + secAngle + 'deg)');
    }
};
tool.init();