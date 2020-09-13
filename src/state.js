import {DrawFuncs} from '@/drawFuncs';

export let pencil = {
    thickness: 1,
    color: 'black'

}

export let newPage = new DrawFuncs(pencil);
newPage.draw()



let slider = document.getElementById('range');


slider.oninput = () => {
    let thickness = document.getElementById('thickness')
    thickness.innerText = `Thickness : ${slider.value}`

}


slider.onchange = () => {
    let canvas = document.getElementById('page')
    let ctx = canvas.getContext('2d')

    newPage.thickness = slider.value
    ctx.lineWidth = newPage.thickness * 2

}
