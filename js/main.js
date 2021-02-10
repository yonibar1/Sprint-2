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

    var meme = getMeme()


    const img = new Image()
    gCurrImg = img
    img.src = elImage.src;
    img.onload = () => {
        setImage();
    }

}

function onDecrease() {
    decrease()
}

function onIncrease() {
    increase()
}
function onChangeLine() {
    changeLine()
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

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }