
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
];


function init() {
    renderGallery()
}
function renderGallery() {
    var strHTMLs = gImgs.map(img => {
        return `<img src="${img.url}" alt="${img.keywords}">`
    })
    var elGallery = document.querySelector('#gallery')
    elGallery.innerHTML = strHTMLs.join('')
}