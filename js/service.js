
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
    lines: []
}

// defaults
const lineDifference = 50;
let defaultFontSize = 40;
let defaultColor = 'white';
let defaultAlign = 'center';
let defaultStroke = 'black';
let defaultY = lineDifference;

function getImgs() {
    return gImgs
}
function getMeme() {
    return gMeme
}

function updateMemeIdx(elImage) {
    gMeme.selectedImgId = elImage.dataset.id
}

function updateMemeContent(newText) {
    if (gMeme.lines.length === 0) {
        addLine();
    }
    gMeme.lines[gMeme.selectedLineIdx].txt = newText;
    resetAndDraw()

}

function resetAndDraw() {
    clearCanvas()
    setImage()
    gMeme.lines.forEach(drawText)
}

function addLine() {
    const last = gMeme.lines.length > 0 ? gMeme.lines[gMeme.lines.length - 1] : null;
    const y = last ? last.y + lineDifference : defaultY;
    const line = { txt: '', fontSize: defaultFontSize, color: defaultColor, align: defaultAlign, stroke: defaultStroke, y }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function changeLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function increase() {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += 5
    if (gMeme.lines[gMeme.selectedLineIdx].fontSize > 100) return
    resetAndDraw()
}
function decrease() {
    gMeme.lines[gMeme.selectedLineIdx].fontSize -= 5
    if (gMeme.lines[gMeme.selectedLineIdx].fontSize < 20) return
    resetAndDraw()
}


