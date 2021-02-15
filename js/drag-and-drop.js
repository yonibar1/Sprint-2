'use strict'

var gLine;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
function initDragAndDrop() {
    resizeCanvas()
    gLine = createLine()
    addListeners()
    resetAndDraw()
    drawText(gLine)
    resetAndDraw()
}

function createLine() {
    return gMeme.lines[gMeme.selectedLineIdx]

}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        resetAndDraw()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)

    gElCanvas.addEventListener('mousedown', onDown)

    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)

    gElCanvas.addEventListener('touchstart', onDown)

    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isCirlceClicked(pos)) return
    gLine.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (gLine.isDragging) {
        const pos = getEvPos(ev)
        const dy = pos.y - gStartPos.y

        gLine.y += dy
        gStartPos = pos
        resetAndDraw()
    }
}

function onUp() {
    gLine.isDragging = false
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elCanvas = document.querySelector('#my-canvas');
    gElCanvas.width = elCanvas.offsetWidth
    gElCanvas.height = elCanvas.offsetHeight
    resetAndDraw()
}

function getEvPos(ev) {
    var pos = {
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isCirlceClicked(clickedPos) {
    const posY = gLine.y
    const distance = Math.sqrt((posY - clickedPos.y) ** 2)
    return distance <= gLine.y
}

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, size, 0, 2 * Math.PI);
    gCtx.strokeStyle = 'white'
    gCtx.stroke();
    gCtx.fillStyle = color
    gCtx.fill()

}



