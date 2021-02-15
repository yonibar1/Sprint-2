'use strict'
var gElCanvas;
var gCtx;

function init() {
    renderGallery()
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

}
function renderGallery() {
    var imgs = getImgs()
    var strHTMLs = imgs.map(img => {
        return `<img onclick="drawImgFromlocal(this);" data-id="${img.id}" src="${img.url}" alt="${img.keywords}">`
    })
    var elGallery = document.querySelector('#gallery')
    elGallery.innerHTML = strHTMLs.join('')
}

var gCurrImg;

function drawImgFromlocal(elImage) {
    var elEditor = document.querySelector('#editor')
    elEditor.classList.remove('hide')
    updateMemeIdx(elImage)
    const img = new Image()
    gCurrImg = img
    img.src = elImage.src;
    img.onload = () => {
        setImage();
    }
}

function onMoveLine(diff) {
    moveLine(diff)
}

function onSetFontSize(diff) {
    setFontSize(diff)
}

function onSetColorFill(inputColor) {
    setColorFill(inputColor);
}

function onSetStrokeColor(inputColor) {
    setStrokeColor(inputColor);
}

function onDeleteLine() {
    deleteLine()
}

function onSetAlign(direction) {
    setAlign(direction)
}

function onChangeLine() {
    changeLine()
}

function onSetFont(value) {
    setFont(value)
}

function setImage() {
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
}

function onDrawText() {
    var text = document.querySelector('[name=text-input]').value
    updateMemeContent(text)
    initDragAndDrop()
}

function drawText(line) {
    if (!line) return
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.color
    gCtx.font = line.fontSize + 'px ' + line.font
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, gElCanvas.width / 2, line.y)
    gCtx.strokeText(line.txt, gElCanvas.width / 2, line.y)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function toggleMenu() {
    document.body.classList.toggle('open-menu')
}
function onSaveImg() {
    var memeToSave = { id: makeId(), url: gElCanvas.toDataURL('image/jpeg') }
    gSavedMemes.push(memeToSave)
    saveImg()
}

function downloadImg(elLink) {
    resetAndDraw(true)
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}




function renderSavedMemes() {
    var memes = getSavedMemes()
    console.log(memes);
    var strHTMLs = memes.map((meme) => {
        return `<img src="${meme.url}">`
    }).join('');
    console.log(strHTMLs);
    document.querySelector('.saved-memes').innerHTML = strHTMLs
    document.querySelector('.saved-memes-header').innerText = 'Saved Memes'
    document.querySelector('.return-btn').classList.remove('hide')
    document.querySelector('.return-btn').innerHTML = `<button onclick="location.reload();">Home</button>`
}

