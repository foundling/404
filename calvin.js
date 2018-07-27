class Sprite {

    constructor(ctx, src, [x,y]=[0,0]) {

        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.direction = 'left';

        this.img = new Image(); // wait until 'load' to draw image
        this.img.addEventListener('load',this.render.bind(this));
        this.img.src = src;

    }
    
    render(event, pX=this.x, pY=this.y, direction) {
        console.log('img loaded');

        const [
            sourceStartX,
            sourceWidth,
            sourceStartY,
            sourceHeight
        ] = this.getMaskCoordinates(direction,[this.img.width, this.img.height]);

        const destStartX = pX;
        const destWidth = this.img.width/2;
        const destStartY = pY;
        const destHeight = this.img.height;

        this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(  
            this.img, 
            sourceStartX, 
            sourceStartY, 
            sourceWidth, 
            sourceHeight,
            destStartX,
            destStartY,
            destWidth,
            destHeight);
    }

    getMaskCoordinates(direction, [w,h]) {

        let startX = (direction === 'left') ? 0 : w/2;
        let startY = 0;
        let width = w/2;
        let height = h;

        return [startX,width,startY,height];

    }

    scale(factor) {
        // make calvin larger or smaller based on the # of step
        // he was last on and which one this is.
        this.img.height *= factor;
        this.img.width *= factor;
    }

}

class Calvin {

    constructor(ctx,srcImage,[x,y]=[0,0],Sprite) {

        this.ctx = ctx;
        this.sprite = new Sprite(ctx,srcImage,[x,y]); // 
        this.x = x; // which corner does this x,y represent?
        this.y = y;
        this.currentStep = 0;
        this.moveFactor = 10;

        // think about mobile events, like tap, swipe
        // hammer.js might be useful
        window.addEventListener('keyup', this.dispatchEvent.bind(this)); 

        kd.RIGHT.down(function() {
            this.move(1);
        }.bind(this));

        kd.LEFT.down(function() {
            this.move(-1);
        }.bind(this));

        kd.DOWN.down(function() {
            this.jump(-1);
        }.bind(this));

        kd.UP.down(function() {
            this.jump(1);
        }.bind(this));

    }

    dispatchEvent({key}) {

        switch (key) {
            case 'ArrowLeft':   this.move(-1);
                                break;
            case 'ArrowRight':  this.move(1);
                                break;
            case 'ArrowUp':     this.jump(1);
                                break;
            case 'ArrowDown':   this.jump(-1);
                                break;
            default:            break;
        }

    }

    render(x,y) {
        this.sprite.render(null,x,y, this.direction);
    }

    jump(dir) {
        this.y -= (this.moveFactor*dir);
        this.render(this.x, this.y);
    }

    move(dir) {
        console.log(this.direction);
        this.direction = dir < 0 ? 'left' : 'right';
        this.x += (dir * this.moveFactor);
        this.render(this.x, this.y);
    }
}

class Step {

    // use for ground and elevated steps
    constructor(ctx, index, x, y) {

        this.ctx = ctx; 
        this.index = index;
        this.width = width;
        this.height = height;
        
        window.addEventListener('load', this.render.bind(this));
    }

    render() {
        //this.fillRect();
    }

}

class Canvas {

    constructor(elementId) {
        this.canvas = document.getElementById(elementId); 
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
        window.addEventListener('resize', this.setCanvasSize.bind(this));  
    }

    get height() {
        return this.canvas.height;
    }

    get width() {
        return this.canvas.width;
    }

    get size() {
        return [this.canvas.height, this.canvas.width];
    }

    setCanvasSize(event, height=window.outerHeight, width=window.outerWidth) {
        this.canvas.height = height;
        this.canvas.width = width;
    }

}

const { ctx } = new Canvas('canvas'); 
const calvin = new Calvin(ctx, 'calvin_sprite.png', [0,0], Sprite);

kd.run(function() {
    kd.tick();
});
