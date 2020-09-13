import {zoom} from '@/zoom';


export class DrawFuncs {
    constructor({thickness, color}) {
        this.thickness = thickness
        this.color = color

    }

    draw() {
        let canvas = document.getElementById('page')
        let ctx = canvas.getContext('2d')
        ctx.lineWidth = this.thickness * 2
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        let mouse = {x: 0, y: 0}
        let isDraw = false

        canvas.addEventListener('mousedown', function (e) {
            mouse = getMousePos(canvas, e)
            isDraw = true
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, ctx.lineWidth / 2, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.lineTo(mouse.x, mouse.y);

        })

        canvas.addEventListener('mousemove', function (e) {

            if (isDraw) {
                mouse = getMousePos(canvas, e)
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, ctx.lineWidth / 2, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
            }

        })

        canvas.addEventListener('mouseup', function (e) {
            mouse = getMousePos(canvas, e)
            isDraw = false;
            ctx.beginPath();

        })

        canvas.addEventListener('mouseout', function (e) {
            mouse = getMousePos(canvas, e)
            ctx.closePath();
            isDraw = false;
        })

        canvas.onwheel = zoom


    }


}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY   // been adjusted to be relative to element
    }
}

