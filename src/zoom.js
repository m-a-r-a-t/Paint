export function zoom(event) {
    let canvas = document.getElementById('page')
    let w = Math.floor(canvas.width)
    let h = Math.floor(canvas.height)
    let top = 0;
    let left = 0;
    event.preventDefault();

    if (event.deltaY < 0 && scale < 32) {
        scale >= 1 ? scale += 1 : scale += 0.25;
    }
    if (event.deltaY > 0 && scale > 0.25) {
        scale > 1 ? scale -= 1 : scale -= 0.25;
    }

    left = ((w - (w * scale)) / 2) - 25
    top = ((h - (h * scale)) / 2) - 115
    canvas.style.left = left > 0 ? `-${((w - (w * scale)) / 2) - 25}px` : `${-(((w - (w * scale)) / 2) - 25)}px`
    canvas.style.transform = `scale(${scale})`
    canvas.style.top = top < 0 ? `${-(((h - (h * scale)) / 2) - 115)}px` : `-${((h - (h * scale)) / 2) - 115}px`
}

let scale = 1;
