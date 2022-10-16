import {newPage} from '@/state';

let pencilButton = document.getElementById('edit')
pencilButton.onmousedown = changePencil


export function changePencil() {
    let canvas = document.getElementById('page')
    let ctx = canvas.getContext('2d')
    ctx.strokeStyle = newPage.color;
    ctx.fillStyle = newPage.color;

}

