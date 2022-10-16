import {pencil} from '@/state';

let eraser = document.getElementById('eraser')
eraser.onmousedown = function () {
    debugger
    let canvas = document.getElementById('page')
    let ctx = canvas.getContext('2d')
    ctx.strokeStyle = pencil.eraser;
    ctx.fillStyle = pencil.eraser;

}