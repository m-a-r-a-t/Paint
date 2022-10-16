import {changePencil} from '@/buttonFuncs/pencil';

let button = document.getElementsByClassName('button')
for (let i = 0; i < button.length; i++) {
    button[i].onclick = addButtonClassList
}


export function addButtonClassList(e) {
    let changed = document.getElementsByClassName('changed__button')[0];
    changed.classList.remove('changed__button')

    if (e == null) {
        let pencilButton = document.getElementById('edit')
        pencilButton.classList.add('changed__button')
        changePencil()
        return
    }


    e.target.classList.add('changed__button')
}