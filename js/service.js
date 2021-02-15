'use strict'
const SAVEDMEMES = 'Saved memes'
var gSavedMemes = []
var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['happy'] },
    { id: 19, url: 'meme-imgs/19.jpg', keywords: ['happy'] },
    { id: 20, url: 'meme-imgs/20.jpg', keywords: ['happy'] },
];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [],
}

function getImgById(id) {
    var idx = parseInt(id)
    var x = gImgs.find((img) => {
        return img.id === idx
    })
}

// defaults
const lineDifference = 50;
let defaultFontSize = 40;
let defaultColor = 'white';
let defaultAlign = 'center';
let defaultStroke = 'black';
let defaultY = lineDifference;
let defaultFont = 'Impact'
let defaultX = document.querySelector('#my-canvas').width / 2

function getImgs() {
    return gImgs
}
function getMeme() {
    return gMeme
}

function saveImg() {
    if (!gSavedMemes) {
        gSavedMemes = loadFromStorage(SAVEDMEMES)
    }
    _saveMemeToStorage(SAVEDMEMES, gSavedMemes)
}

function updateMemeIdx(elImage) {
    gMeme.selectedImgId = elImage.dataset.id
}
function getSavedMemes() {
    return loadFromStorage(SAVEDMEMES)
}
function updateMemeContent(newText) {
    if (gMeme.lines.length === 0) {
        addLine();
    }
    gMeme.lines[gMeme.selectedLineIdx].txt = newText;
    resetAndDraw()
}

function resetAndDraw(isDownload = false) {
    clearCanvas()
    setImage()
    gMeme.lines.forEach(drawText)
    if (!isDownload) {
        focusLine(gMeme.lines[gMeme.selectedLineIdx])
    }

}

function addLine() {
    const last = gMeme.lines.length > 0 ? gMeme.lines[gMeme.lines.length - 1] : null;
    const y = last ? last.y + lineDifference : defaultY;
    const line = { txt: '', fontSize: defaultFontSize, x: defaultX, color: defaultColor, align: defaultAlign, font: defaultFont, stroke: defaultStroke, y, isDragging: false }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    document.querySelector('.show-line').innerText = gMeme.selectedLineIdx + 1
    resetAndDraw()
}

function changeLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
    document.querySelector('.show-line').innerText = gMeme.selectedLineIdx + 1
    resetAndDraw()
    initDragAndDrop()
}

function focusLine(line) {
    gCtx.beginPath();

    gCtx.moveTo(0, (line.y + 10));
    gCtx.lineTo(gElCanvas.width, (line.y + 10));
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
    gCtx.closePath()
}


function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
    if (gMeme.lines[gMeme.selectedLineIdx].fontSize > 100) return
    if (gMeme.lines[gMeme.selectedLineIdx].fontSize < 20) return
    resetAndDraw()
}

function setFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
    resetAndDraw()
}

function setAlign(direction) {
    if (!gMeme.lines.length) return
    if (direction === 'left') gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    if (direction === 'center') gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    if (direction === 'right') gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    resetAndDraw()
}

function deleteLine() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return
    var userAnswer = confirm(`are you sure you want to delete this line - "${gMeme.lines[gMeme.selectedLineIdx].txt
        }"`)
    if (!userAnswer) return
    else {
        gMeme.lines[gMeme.selectedLineIdx]--
        resetAndDraw()
    }
}

function moveLine(diff) {
    if (!gMeme.lines.length) return
    if (!diff) {
        if ((gMeme.lines[gMeme.selectedLineIdx].y + gMeme.lines[gMeme.selectedLineIdx].fontSize / 2) === gElCanvas.height) return
        gMeme.lines[gMeme.selectedLineIdx].y += 10
        resetAndDraw()
    }
    if (diff) {
        if ((gMeme.lines[gMeme.selectedLineIdx].y - gMeme.lines[gMeme.selectedLineIdx].fontSize) === 0) return
        gMeme.lines[gMeme.selectedLineIdx].y -= 10
        resetAndDraw()
    }
}

function setColorFill(inputColor) {
    var elInput = document.querySelector('.text-color')
    elInput.style.backgroundColor = inputColor
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.color = inputColor;
    resetAndDraw()
}
function setStrokeColor(inputColor) {
    var elInput = document.querySelector('.stroke-color')
    elInput.style.backgroundColor = inputColor
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.stroke = inputColor;
    resetAndDraw()
}

function _saveMemeToStorage(key, val) {
    saveToStorage(key, val)
}
