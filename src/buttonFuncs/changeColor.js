import './jscolor'
import {newPage} from '@/state';
import {addButtonClassList} from '@/buttonFuncs/changeLeftButtons';


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


function addColorClassList(e) {
    let changed = document.getElementsByClassName('changed__color')[0];
    changed.classList.remove('changed__color')
    addButtonClassList(null)
    e.target.classList.add('changed__color')
    let canvas = document.getElementById('page')
    let ctx = canvas.getContext('2d')
    newPage.color = e.target.jscolor.toRGBAString()
    ctx.strokeStyle = newPage.color;
    ctx.fillStyle = newPage.color;


}

color1.onclick = addColorClassList
color2.onclick = addColorClassList