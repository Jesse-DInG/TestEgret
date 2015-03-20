class LittleGame extends egret.DisplayObjectContainer {
	public GRAVITY:number = 3;


    private game_width :number = egret.MainContext.instance.stage.stageWidth;
    private game_height:number = egret.MainContext.instance.stage.stageHeight;

   	private bg:egret.Sprite;

   	private arrow:egret.Sprite;
   	private aimList:egret.Sprite[];

   	private circleSP:egret.Sprite;
   	private testText1:egret.TextField;
   	private testText2:egret.TextField;

   	private isDown:Boolean;
   	private isRun:Boolean;

   	private vx:number;
   	private vy:number;
    /**构造函数*/
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.startGame,this);
    }

    private init():void{
		this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x00ffff,1);
        this.bg.graphics.drawRect(0,0,this.game_width,this.game_height);
        this.bg.graphics.endFill();
        this.bg.graphics.lineStyle(10,0xff0000,1);
        this.bg.graphics.beginFill(0xffff00,1);
        this.bg.graphics.moveTo(0,this.game_height*0.6);
        console.log('xxx:' + this.game_height*0.8);
        this.bg.graphics.lineTo(this.game_width,this.game_height*0.6);
        this.addChild(this.bg);

        this.arrow = new egret.Sprite();
        this.arrow.graphics.lineStyle(1,0x000000,1);
        this.arrow.graphics.beginFill(0x0000ff,1);
        this.arrow.graphics.drawRect(-50,-2,50,4);
        this.arrow.graphics.lineStyle(1,0x000000,1);
        this.arrow.graphics.beginFill(0x0000ff,1);
        this.arrow.graphics.drawCircle(0,0,10);
        this.arrow.graphics.endFill();
        this.addChild(this.arrow);

        this.circleSP = new egret.Sprite();
        this.circleSP.graphics.lineStyle(1,0xff0000,1);
        this.circleSP.graphics.beginFill(0xff0000,1);
        this.circleSP.graphics.drawCircle(0,0,50);
        this.circleSP.graphics.endFill();
        this.addChild(this.circleSP);

        this.testText1 = new egret.TextField();
		this.testText1.text = "我是地球人";
		this.addChild(this.testText1);
		this.testText2 = new egret.TextField();
		this.testText2.text = "我是地球人";
		this.testText2.y = 20;
		this.addChild(this.testText2);
    }

    private initEvent():void{
        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDownHandler,this);
    }

    private touchDownHandler(evt:egret.TouchEvent):void{
    	if(this.isRun){

    	}
    	if(!this.isDown){
    		this.isDown = true;
    		//按下屏幕
    		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDownHandler,this);
    		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchUpHandler,this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchUpHandler,this);
			this.setArrowPos(evt.stageX,evt.stageY);
    	}
    }
	/**响应Touch*/
	private touchHandler(evt:egret.TouchEvent):void{
		if(this.isRun){
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
			return;
		}

		if(this.isDown){
			this.setArrowPos(evt.stageX,evt.stageY);
		}

	}

	private touchUpHandler(evt:egret.TouchEvent):void{
		this.isRun = true;
		this.removeTouchHandler();
		this.vx = this.game_width / 30;
		this.vy = -this.game_height / 30;
		this.start();
	}

	private removeTouchHandler():void{
		console.log("zzz");
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDownHandler,this);
		console.log("zzz");
    	this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
		console.log("zzz");
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchUpHandler,this);
		console.log("zzz");
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchUpHandler,this);
	}

	private setArrowPos(x:number,y:number):void{
		var r:number = Math.atan(this.arrow.y - y)/(this.arrow.x - x)/Math.PI*360;
		this.arrow.rotation = r;
		this.circleSP.visible = true;
		var alpha:number = egret.Point.distance(new egret.Point(this.arrow.x,this.arrow.y),new egret.Point(x,y))/(this.game_width*0.2);
		this.circleSP.alpha = alpha;
		this.testText1.text = "角度:" + r + ",alpha:" + alpha;
	}
	private reset():void{
		console.log("rrrr");
		this.isDown = false;
		this.isRun = false;
		console.log("rrrr0");
		this.removeTouchHandler();
		console.log("rrrr1");
		this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		console.log("rrrr2");
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchDownHandler,this);

		this.circleSP.x = this.arrow.x = this.game_width*0.2;
    	this.circleSP.y = this.arrow.y = this.game_height*0.6;

    	this.circleSP.visible = false;

    	this.testText1.text = "2222";
		this.testText2.text = "2222";
	}

    /**游戏启动后，会自动执行此方法*/
    public startGame():void {
    	this.init();
     	this.initEvent();

		this.circleSP.x = this.arrow.x = this.game_width*0.2;
		this.circleSP.y = this.arrow.y = this.game_height*0.6;

    	this.circleSP.visible = false;
    }

    public start():void {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    }	

    private enterFrameHandler(evt:egret.Event):void{
    	if(this.isRun){
    		this.arrow.x += this.vx;
    		this.arrow.y += this.vy;
    		this.vy += this.GRAVITY;

			this.testText2.text = "vx:" + this.vx + ",vy:" + this.vy;

    		if(this.arrow.x > this.game_width || this.arrow.y > this.game_height * 0.6){
    			this.end();
    			this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    		}
    	}
    }

    private end():void{
    	console.log("ssss");
    	setTimeout(this.reset,this,2000);
    }
}