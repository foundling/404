const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let Calvin = {
    imgProps: {
        src: 'calvin_sprite.png',
    },
    img: null,
    x: null,
    y: null
};

function move() {
    // :]
}

function scaleImg(canvas, img, factor) {

    if (factor < 0 || factor == null)
        throw new Error('that number is garbage!');

    return [ img.height * factor, img.width * factor ];

}

function initShape(S) {

    const [w,h] = getCanvasSize();
    S.img = new Image();

    S.img.addEventListener('load', function() {

        const [ imgW, imgH ] = scaleImg(canvas, S.img, 1/4);
        const [pX,pY] = [(canvas.width/2 - imgW/2), canvas.height - imgH];

        ctx.drawImage(S.img,pX, pY - 100, imgW, imgH);

    });

    window.addEventListener('keyup', move);

    S.img.src = S.imgProps.src;

}

function setCanvasSize() {
    canvas.height = window.outerHeight;
    canvas.width = window.outerWidth;
}

function drawGround(ctx, canvas) {
    ctx.fillRect(0, canvas.height - 100, canvas.width, canvas.height);
}

function getCanvasSize() {
    return [canvas.height, canvas.width];
}

function initCanvas () {

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    let [w, h] = getCanvasSize();

}

initCanvas();
drawGround(ctx, canvas);
initShape(Calvin);
