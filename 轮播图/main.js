function dPicbox(boxid) {
    this.boxEle = $("#" + boxid);
    this.innerEle;
    this.width;
    this.height;
    this.AllPicNum;
    this.leftArrow;
    this.rightArrow;
    this.nowPic = 1;
    this.Timer;

    this.init = function(width, height) {
        this.width = width;
        this.height = height;
        this.boxEle.css({ width: width + "px", height: height + "px", position: "relative", overflow: "hidden" });
        this.AllPicNum = this.boxEle.children().length;

        this.boxEle.wrapInner("<div id='inner'></div>");
        this.innerEle = $("#inner");
        this.innerEle.css({ width: "9999px", position: "absolute", left: "-" + width + "px", top: "0", height: height + "px" });

        var firstEle = this.innerEle.find("a").first().clone();
        var lastEle = this.innerEle.find("a").last().clone()
        this.innerEle.prepend(lastEle);
        this.innerEle.append(firstEle);

        this.innerEle.find("a").css({ float: "left" });

        this.boxEle.append("<div id='ctl'><span id='leftArrow'><</span><span id='rightArrow'>></span></div>");
        this.leftArrow = $("#leftArrow");
        this.rightArrow = $("#rightArrow");
        $("#ctl span").css({ width: "40px", height: "60px", background: "rgb(0,0,0)", position: "absolute", top: "50%", marginTop: "-30px", fontSize: "40px", color: "#ffffff", lineHeight: "60px", textAlign: "center", opacity: "0.4", cursor: "pointer" });
        this.leftArrow.css({ left: "5px" });
        this.rightArrow.css({ right: "5px" });

        this.bind();
        this.autoPlay();
    };

    this.bind = function() {
        $("#ctl span").on("mouseenter", function() {
            $(this).css({ opacity: "0.8" });
        });

        $("#ctl span").on("mouseleave", function() {
            $(this).css({ opacity: "0.4" });
        });
        var that = this;
        this.leftArrow.on("click", function() { that.prePic(); });
        this.rightArrow.on("click", function() { that.nextPic(); });
        this.boxEle.on("mouseenter", function() {
            clearInterval(that.Timer);
        });
        this.boxEle.on("mouseleave", function() {
            that.autoPlay();
        });
    };

    this.autoPlay = function() {
        that = this;
        this.Timer = setInterval(function() {
            that.nextPic();
        }, 5000);
    };
    //下一张图片	
    this.nextPic = function() {
        //当前图片位置在最后一张的时候
        if (this.nowPic == this.AllPicNum) {
            //瞬间跳回到第一个位置的图片
            this.innerEle.css({ left: "0" });
            this.nowPic = 1;
        } else {
            this.nowPic++;
        }
        this.gotoPic();
    };
    //上一张图片	
    this.prePic = function() {
        //当前图片位置在第一张的时候
        if (this.nowPic == 1) {
            //瞬间跳回到最后一个位置的图片
            this.innerEle.css({ left: "-" + (this.AllPicNum + 1) * this.width + "px" });
            this.nowPic = this.AllPicNum;
        } else {
            this.nowPic--;
        }
        this.gotoPic();
    };
    this.gotoPic = function() {
        var nowLeft = "-" + (this.nowPic * this.width) + "px";
        this.innerEle.animate({ left: nowLeft });
    };

}


