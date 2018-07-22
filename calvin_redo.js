class Sprite {

    // TODO: think about how to represent a mask
    // with left and right sides for the left-and-right-facing images

    constructor(src, height, width) {

        this.height = height;
        this.width = width;
        this.img = new Image();
        this.img.src = src;

        window.addEventListener('load', this.render.bind(this));

    }
    
    render(width=this.width,height=this.height) {
        this.ctx.drawImage(this.img, this.x, this.y, width, height);
    }

    scale(factor) {
        // make calvin larger or smaller based on the # of step
        // he was last on, and which one this is.
        this.render(height=this.height*factor, width=this.width*factor);
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

    constructor(ctx,x,y,CalvinImage) {

        this.currentStep = 0;
        this.ctx = ctx;
        this.x = x; // which corner does this x,y represent?
        this.y = y;
        this.img = new Sprite('calvin.png',[]); // 
        this.src;


        // think about mobile events, like tap, swipe
        // hammer.js might be useful
        window.addEventListener('keyup', this.dispatchEvent); 
        window.addEventListener('load', this.render.bind(this));

    }

    dispatchEvent(e) {
        // if  key code is left / right arrow: move
        // if key is up: jump
        // video game feel: you can run and jump, but stop yourself from continuing
        // in mid air. 
    }

    update(newX,newY) {
        // update position
        this.x = newX;
        this.y = newY;

        // push updates to image
        this.render(this.x, this.y);
    }

    render() {
        this.img.render();
    }

    jump() {
        // gravity fn
    }

    move() {
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
    }

    setCanvasSize(height=window.outerHeight,width=window.outerWidth) {
        this.canvas.height = height;
        this.canvas.width = width;
    }

    getCanvasSize() {
        return [this.canvas.height, this.canvas.width];
    }

}
