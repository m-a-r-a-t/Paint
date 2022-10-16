import {DrawFuncs} from '@/drawFuncs'
import {cursorRect} from '@/zoom'

export let pencil = {
    thickness: 1,
    color: 'black',
    scale: 1,
    size: 2,
    eraser: 'rgb(255, 255, 255)'
}

export let newPage = new DrawFuncs(pencil)
newPage.draw()
let slider = document.getElementById('range')

slider.oninput = () => {
    let thickness = document.getElementById('thickness')
    thickness.innerText = `Thickness : ${slider.value}`
}

slider.onchange = () => {
    let canvas = document.getElementById('page')
    let ctx = canvas.getContext('2d')
    newPage.thickness = slider.value
    ctx.lineWidth = newPage.thickness * 2
    let cursorCanvas = document.getElementsByClassName('cursor')[0]
    cursorCanvas.style.width = pencil.size * pencil.scale * newPage.thickness + 'px'
    cursorCanvas.style.height = pencil.size * pencil.scale * newPage.thickness + 'px'
    let rect = cursorCanvas.getBoundingClientRect()
    cursorRect.width = rect.width / 2
    cursorRect.height = rect.height / 2
}
