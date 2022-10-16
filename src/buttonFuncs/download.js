let download = document.getElementById('download')
download.onclick = function () {
    let img = document.getElementById('page').toDataURL('image/png');
    let link = document.createElement('a');
    link.href = img;
    link.download = 'my-image-name.png';
    link.click();
}