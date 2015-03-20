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
        this.game_width = egret.MainContext.instance.stage.stageWidth;
        this.game_height = egret.MainContext.instance.stage.stageHeight;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    LittleGame.prototype.init = function () {
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x00ff00, 1);
        this.bg.graphics.drawRect(0, 0, this.game_width, this.game_height);
        this.bg.graphics.endFill();
        this.bg.graphics.lineStyle(5, 0xff0000, 1);
        this.bg.graphics.moveTo(0, this.game_height * 0.8);
        this.bg.graphics.lineTo(this.game_width, this.game_height * 0.8);
        this.addChild(this.bg);
        this.arrow = new egret.Sprite();
        this.arrow.graphics.beginFill(0x0000ff, 1);
        this.arrow.graphics.lineStyle(1, 0, 1);
        this.arrow.graphics.drawCircle(0, 0, 10);
        this.arrow.graphics.drawRect(-20, -2, 0, 2);
        this.arrow.graphics.endFill();
        this.addChild(this.arrow);
    };
    /**游戏启动后，会自动执行此方法*/
    LittleGame.prototype.startGame = function () {
        this.init();
        this.arrow.x = this.game_width * 0.2;
        this.arrow.y = this.game_height * 0.8;
    };
    return LittleGame;
})(egret.DisplayObjectContainer);
