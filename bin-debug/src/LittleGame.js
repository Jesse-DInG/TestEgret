var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LittleGame = (function (_super) {
    __extends(LittleGame, _super);
    /**构造函数*/
    function LittleGame() {
        _super.call(this);
        this.GRAVITY = 1;
        this.game_width = egret.MainContext.instance.stage.stageWidth;
        this.game_height = egret.MainContext.instance.stage.stageHeight;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    LittleGame.prototype.init = function () {
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x00ffff, 1);
        this.bg.graphics.drawRect(0, 0, this.game_width, this.game_height);
        this.bg.graphics.endFill();
        this.bg.graphics.lineStyle(10, 0xff0000, 1);
        this.bg.graphics.beginFill(0xffff00, 1);
        this.bg.graphics.moveTo(0, this.game_height * 0.6);
        console.log('xxx:' + this.game_height * 0.8);
        this.bg.graphics.lineTo(this.game_width, this.game_height * 0.6);
        this.addChild(this.bg);
        this.arrow = new egret.Sprite();
        this.arrow.graphics.lineStyle(1, 0x000000, 1);
        this.arrow.graphics.beginFill(0x0000ff, 1);
        this.arrow.graphics.drawRect(-50, -2, 50, 4);
        this.arrow.graphics.lineStyle(1, 0x000000, 1);
        this.arrow.graphics.beginFill(0x0000ff, 1);
        this.arrow.graphics.drawCircle(0, 0, 10);
        this.arrow.graphics.endFill();
        this.addChild(this.arrow);
        this.circleSP = new egret.Sprite();
        this.circleSP.graphics.lineStyle(1, 0xff0000, 1);
        this.circleSP.graphics.beginFill(0xff0000, 1);
        this.circleSP.graphics.drawCircle(0, 0, 50);
        this.circleSP.graphics.endFill();
        this.addChild(this.circleSP);
        this.testText1 = new egret.TextField();
        this.testText1.text = "我是地球人";
        this.addChild(this.testText1);
        this.testText2 = new egret.TextField();
        this.testText2.text = "我是地球人";
        this.testText2.y = 20;
        this.addChild(this.testText2);
        this.aimList = new Array();
        this.touchEnabled = true;
    };
    LittleGame.prototype.touchDownHandler = function (evt) {
        if (this.isRun) {
        }
        if (!this.isDown) {
            this.isDown = true;
            //按下屏幕
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDownHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchUpHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchUpHandler, this);
            this.setArrowPos(evt.stageX, evt.stageY);
        }
    };
    /**响应Touch*/
    LittleGame.prototype.touchHandler = function (evt) {
        if (this.isRun) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            return;
        }
        if (this.isDown) {
            this.setArrowPos(evt.stageX, evt.stageY);
        }
    };
    LittleGame.prototype.touchUpHandler = function (evt) {
        this.isRun = true;
        this.removeTouchHandler();
        this.vx = this.game_width / 30 * Math.cos(this.raid) * this.arrow.alpha;
        this.vy = this.game_height / 30 * Math.sin(this.raid) * this.arrow.alpha;
        this.testText2.text = "raid:" + this.fixNum(this.raid) + ",vx:" + this.fixNum(this.vx) + ",vy:" + this.fixNum(this.vy);
        this.start();
    };
    LittleGame.prototype.removeTouchHandler = function () {
        console.log("zzz");
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDownHandler, this);
        console.log("zzz");
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        console.log("zzz");
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchUpHandler, this);
        console.log("zzz");
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchUpHandler, this);
    };
    LittleGame.prototype.updateRaid = function () {
        this.raid = Math.atan((this.arrow.y - this.o_y) / (this.arrow.x - this.o_x));
    };
    LittleGame.prototype.setArrowPos = function (x, y) {
        this.o_x = x;
        this.o_y = y;
        this.updateRaid();
        if (this.raid > 0 || this.o_x > this.arrow.x) {
            if (this.o_y > this.arrow.y)
                this.raid = -Math.PI / 2;
            else
                this.raid = 0;
        }
        var r = this.raid / Math.PI * 180;
        this.arrow.rotation = (r + 360) % 360;
        this.circleSP.visible = true;
        var alpha = egret.Point.distance(new egret.Point(this.arrow.x, this.arrow.y), new egret.Point(x, y)) / (this.game_width * 0.2);
        this.circleSP.alpha = alpha;
        this.testText2.text = "x:" + x + ",y:" + y + ",ax:" + this.arrow.x + ",ay:" + this.arrow.y;
        this.testText1.text = "角度:" + this.fixNum(r) + ",alpha:" + this.fixNum(alpha);
    };
    LittleGame.prototype.fixNum = function (num) {
        var f = Math.round(num * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    };
    LittleGame.prototype.reset = function () {
        console.log("rrrr");
        this.isDown = false;
        this.isRun = false;
        console.log("rrrr0");
        this.removeTouchHandler();
        console.log("rrrr1");
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        console.log("rrrr2");
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDownHandler, this);
        this.arrow.rotation = 0;
        this.circleSP.x = this.arrow.x = this.game_width * 0.2;
        this.circleSP.y = this.arrow.y = this.game_height * 0.6;
        this.circleSP.visible = false;
        this.createObj();
        this.goal = 0;
        this.checkHit();
        this.testText1.text = "goal：0";
        this.testText2.text = "press the screen to aim.";
    };
    LittleGame.prototype.createObj = function () {
        while (this.aimList.length > 0) {
            this.bg.removeChild(this.aimList.shift());
        }
        for (var i = 0; i < 10; i++) {
            var op = new egret.Sprite();
            op.graphics.beginFill(0x0, 1);
            op.graphics.drawCircle(0, 0, 10);
            op.graphics.endFill();
            op.x = Math.random() * this.game_width * 0.65 + this.game_width * 0.3;
            op.y = Math.random() * this.game_height * 0.45 + this.game_height * 0.1;
            this.bg.addChild(op);
            this.aimList.push(op);
        }
    };
    /**游戏启动后，会自动执行此方法*/
    LittleGame.prototype.startGame = function () {
        this.init();
        this.reset();
    };
    LittleGame.prototype.start = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    LittleGame.prototype.enterFrameHandler = function (evt) {
        if (this.isRun) {
            this.o_x = this.arrow.x;
            this.o_y = this.arrow.y;
            this.arrow.x += this.vx;
            this.arrow.y += this.vy;
            this.vy += this.GRAVITY;
            this.updateRaid();
            var r = this.raid / Math.PI * 180;
            this.arrow.rotation = (r + 360) % 360;
            //this.testText2.text = "vx:" + this.vx + ",vy:" + this.vy;
            this.checkHit();
            if (this.arrow.x > this.game_width || this.arrow.y > this.game_height * 0.6) {
                this.end();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            }
        }
    };
    LittleGame.prototype.getDistance = function (o1, o2) {
        return Math.sqrt((o1.x - o2.x) * (o1.x - o2.x) + (o1.y - o2.y) * (o1.y - o2.y));
    };
    LittleGame.prototype.checkHit = function () {
        for (var i = this.aimList.length - 1; i >= 0; i--) {
            if (this.aimList[i].alpha != 1)
                continue;
            if (this.getDistance(this.arrow, this.aimList[i]) < 10) {
                this.aimList[i].alpha = 0.5;
                this.goal++;
            }
        }
        this.testText1.text = "goal：" + this.goal;
    };
    LittleGame.prototype.end = function () {
        console.log("ssss");
        egret.setTimeout(this.reset, this, 2000);
    };
    return LittleGame;
})(egret.DisplayObjectContainer);
LittleGame.prototype.__class__ = "LittleGame";
