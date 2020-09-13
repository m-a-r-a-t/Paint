import './jscolor'
import {newPage} from '@/state';

jscolor.install();
let observer1 = new MutationObserver(changeColor);
let observer2 = new MutationObserver(changeColor);

let color1 = document.getElementById('color__first')
let color2 = document.getElementById('color__second')
observer1.observe(color1, {
    attributes: true, attributeFilter: ['style']
})

observer2.observe(color2, {
    attributes: true, attributeFilter: ['style']
})

function changeColor(e) {
    let canvas = document.getElementById('page')
    let ctx = canvas.getContext('2d')
    newPage.color = e[0].target.jscolor.toRGBAString()
    ctx.strokeStyle = newPage.color;
    ctx.fillStyle = newPage.color;
}

