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
    // var meme = getMeme()
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

function onSetFont() {
    var value = document.querySelector('.select').value
    setFont(value)
}

function setImage() {
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
}

function onDrawText() {
    var text = document.querySelector('[name=text-input]').value
    updateMemeContent(text)
}

function canvasClicked(ev) {
    const { offsetX, offsetY } = ev // offset = איפה לחצתי על הקנווס
}

function drawText(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.color
    gCtx.font = `${line.fontSize}px IMPACT`
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

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


