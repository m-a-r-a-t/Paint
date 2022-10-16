import { newPage, pencil } from '@/state'

export function zoom(event) {
  let canvas = document.getElementById('page'),
    w = Math.floor(canvas.width),
    h = Math.floor(canvas.height),
    top = 0,
    left = 0
  // debugger
  event.preventDefault()

  if (event.deltaY < 0 && pencil.scale < 32)
    pencil.scale >= 1 ? (pencil.scale += 1) : (pencil.scale += 0.25)

  if (event.deltaY > 0 && pencil.scale > 0.25)
    pencil.scale > 1 ? (pencil.scale -= 1) : (pencil.scale -= 0.25)

  cursorCanvas.style.width = pencil.size * newPage.thickness * pencil.scale + 'px'
  cursorCanvas.style.height = pencil.size * newPage.thickness * pencil.scale + 'px'
  let rect = cursorCanvas.getBoundingClientRect()
  cursorRect.width = rect.width / 2
  cursorRect.height = rect.height / 2

  left = (w - w * pencil.scale) / 2 - 25
  top = (h - h * pencil.scale) / 2 - 115
  canvas.style.left =
    left > 0 ? `-${(w - w * pencil.scale) / 2 - 25}px` : `${-((w - w * pencil.scale) / 2 - 25)}px`
  canvas.style.transform = `scale(${pencil.scale})`
  canvas.style.top =
    top < 0 ? `${-((h - h * pencil.scale) / 2 - 115)}px` : `-${(h - h * pencil.scale) / 2 - 115}px`
}

let cursorCanvas = document.createElement('div')
cursorCanvas.classList.add('cursor')
document.body.append(cursorCanvas)
export let cursorRect = cursorCanvas.getBoundingClientRect()
cursorRect.width = cursorRect.width / 2
cursorRect.height = cursorRect.height / 2
document.getElementById('page').addEventListener('mousemove', function (e) {
  cursorCanvas.style.left = e.pageX - cursorRect.width + 'px'
  cursorCanvas.style.top = e.pageY - cursorRect.height + 'px'
})

let zoom__in = document.getElementById('zoom__in')
let zoom__out = document.getElementById('zoom__out')
zoom__in.onmousedown = () =>
  zoom({
    deltaY: -200,
    preventDefault: () => null,
  })
zoom__out.onclick = () =>
  zoom({
    deltaY: 200,
    preventDefault: () => null,
  })
