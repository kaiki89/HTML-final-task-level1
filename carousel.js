
"use strict";

/*
  ・メモ…constはjavaのpraiveteっぽい
  ・offsetWidthの解説→https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/offsetWidth　※margin以外の幅を決める
  ・Math.ceilの解説→https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil ※少数を切り上げる
*/
const track = document.querySelector('.carousel-track');  //.carousel-trackをtrackに格納
const slides = document.querySelectorAll('.carousel-track img');  //.carousel-track imgをslides
const prevButton = document.querySelector('.carousel-button.left'); //.carousel-button.leftをprevButtonに格納
const nextButton = document.querySelector('.carousel-button.right');  //.carousel-button.rightをnextButtonに格納
const dotsContainer = document.querySelector('.carousel-dots'); // .carousel-dotsをdotsContainerに格納

let index = 0;  //let型のindexの初期値を0に設定

const slideWidth = 600; //カルーセルの画面幅を600pxに設定

// 2枚ずつまとめて1つのスライドとして扱う
const slidesPerGroup = 2;

// スライドの幅は2枚分の幅を計算
function getSlideWidth() {
    const slide = slides[0];
    return slide.offsetWidth * slidesPerGroup;
}

// スライドをグループ単位で動かす
function updateCarousel() {
    const slideWidth = getSlideWidth();
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // ドットの active 更新は index に合わせて1つずつ
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// index はスライドグループの番号（0,1,2,...）
const dotCount = Math.ceil(slides.length / slidesPerGroup);

for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {  // ドットをクリックできるようにする
        index = i;    // 1つずつ動くので index はドット番号そのまま
        updateCarousel();
        resetAutoPlay();
    });

    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll('button');
function nextSlide() {
    index++;
    if (index >= dotCount) {
        index = 0;
    }
    updateCarousel();
}

function prevSlide() {
    index--;
    if (index < 0) {
        index = dotCount - 1;
    }
    updateCarousel();
}
// 自動再生
let autoPlay = setInterval(nextSlide, 3000);
function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 3000);
}

// ボタン操作
nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});
prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

window.addEventListener('load', updateCarousel);