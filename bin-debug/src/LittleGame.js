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
        this.GRAVITY = 3;
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
    };
    LittleGame.prototype.initEvent = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDownHandler, this);
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
        this.vx = this.game_width / 30;
        this.vy = -this.game_height / 30;
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
    LittleGame.prototype.setArrowPos = function (x, y) {
        var r = Math.atan(this.arrow.y - y) / (this.arrow.x - x) / Math.PI * 360;
        this.arrow.rotation = r;
        this.circleSP.visible = true;
        var alpha = egret.Point.distance(new egret.Point(this.arrow.x, this.arrow.y), new egret.Point(x, y)) / (this.game_width * 0.2);
        this.circleSP.alpha = alpha;
        this.testText1.text = "角度:" + r + ",alpha:" + alpha;
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
        this.circleSP.x = this.arrow.x = this.game_width * 0.2;
        this.circleSP.y = this.arrow.y = this.game_height * 0.6;
        this.circleSP.visible = false;
        this.testText1.text = "2222";
        this.testText2.text = "2222";
    };
    /**游戏启动后，会自动执行此方法*/
    LittleGame.prototype.startGame = function () {
        this.init();
        this.initEvent();
        this.circleSP.x = this.arrow.x = this.game_width * 0.2;
        this.circleSP.y = this.arrow.y = this.game_height * 0.6;
        this.circleSP.visible = false;
    };
    LittleGame.prototype.start = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    LittleGame.prototype.enterFrameHandler = function (evt) {
        if (this.isRun) {
            this.arrow.x += this.vx;
            this.arrow.y += this.vy;
            this.vy += this.GRAVITY;
            this.testText2.text = "vx:" + this.vx + ",vy:" + this.vy;
            if (this.arrow.x > this.game_width || this.arrow.y > this.game_height * 0.6) {
                this.end();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            }
        }
    };
    LittleGame.prototype.end = function () {
        console.log("ssss");
        setTimeout(this.reset, this, 2000);
    };
    return LittleGame;
})(egret.DisplayObjectContainer);
LittleGame.prototype.__class__ = "LittleGame";
