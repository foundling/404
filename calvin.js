class Sprite {

    // TODO: think about how to represent a mask
    // with left and right sides for the left-and-right-facing images

    constructor(ctx, src="calvin.png", [x,y]=[0,0]) {

        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.img = new Image(); // we draw image on 'load' event
        this.img.src = src;
        this.direction = 'left';
        this.img.addEventListener('load', this.render.bind(this));

    }
    
    render({ target }) {

        const [
            sourceStartX,
            sourceWidth,
            sourceStartY,
            sourceHeight
        ] = this.getMaskCoordinates(this.direction,[this.img.width, this.img.height]);

        const destStartX = 0;
        const destWidth = this.img.width/2;
        const destStartY = 0;
        const destHeight = this.img.height;

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
        // he was last on, and which one this is.
        this.img.height *= factor;
        this.img.width *= factor;
    }

    reflect() {
        // create a composite sprite and adjust masking
        // to show left or right facing image
        // use this function signature
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        // s{x,y} are top-left image coords of selection within image}
        // d{x,y} are top-left canvas coords where the selection is placed
    }

}

class Calvin {

    constructor(ctx,[x,y]=[0,0],Sprite) {

        this.ctx = ctx;
        this.sprite = new Sprite(ctx,'calvin_sprite.png',[x,y]); // 
        this.x = x; // which corner does this x,y represent?
        this.y = y;
        this.currentStep = 0;

        //this.sprite.scale(0.5);

        // think about mobile events, like tap, swipe
        // hammer.js might be useful
        window.addEventListener('keyup', this.dispatchEvent.bind(this)); 

    }

    dispatchEvent({key}) {
        console.log(key);
        if (key === 'ArrowLeft') {
            this.move(-1);
        }
        if (key === 'ArrowRight') {
            this.move(1);
        }
        // if  key code is left / right arrow: move
        // if key is up: jump
        // has a video game feel: you can run and jump, 
        // but stop yourself from continuing horizontally in mid air. 
    }

    update(xDir,yDir) {
        // update position
        this.x += xDir;
        this.y += yDir;

        // push updates to image
        this.render(this.x, this.y);
    }

    render(x,y) {
        this.sprite.render();
    }

    jump() {
        // gravity fn
    }

    move(dir) {

        this.direction = dir < 0 ? 'left' : 'right';
        this.x += xDir;
        this.y += yDir;
        this.render(this.x, this.y);

        // move calvin left or right
        // if direction changes, make sure to reflect calvin
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
const calvin = new Calvin(ctx, [0,0], Sprite);
