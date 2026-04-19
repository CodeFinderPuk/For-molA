/* ===== ЭЛЕМЕНТЫ ===== */
const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const videoBg = document.getElementById("videoBg");
const heart = document.querySelector(".heartSVG");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

/* ===== КАРТИНКИ ===== */
const images = [
    "img/1.jpg",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
    "img/10.png",
    "img/11.png",
    "img/12.png",
    "img/13.png"
];

/* ===== ВИДЕО ФОН ===== */
const videos = [
    "https://pub-3e754cbab3e545a593acf1cd6d4fde65.r2.dev/3.mp4",
    "https://pub-3e754cbab3e545a593acf1cd6d4fde65.r2.dev/2.mp4",
    "https://pub-3e754cbab3e545a593acf1cd6d4fde65.r2.dev/1.mp4",
    "https://pub-3e754cbab3e545a593acf1cd6d4fde65.r2.dev/4.mp4"
];

/* возможные размеры плиток */
const layouts = [
    { col: "span 3", row: "span 3" },
    { col: "span 2", row: "span 3" },
    { col: "span 3", row: "span 2" },
    { col: "span 2", row: "span 2" }
];

/* перемешиваем */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* перемешиваем размеры */
shuffle(layouts);

/* создаем видео */
videos.forEach((src, i) => {
    const v = document.createElement("video");

    v.src = src;
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.playsInline = true;

    /* случайный размер */
    v.style.gridColumn = layouts[i].col;
    v.style.gridRow = layouts[i].row;

    videoBg.appendChild(v);

    v.play().catch(() => {});
});

/* УМНАЯ ГЕНЕРАЦИЯ */
let total = 144;
let cols = 12;

let gridMap = [];

for (let i = 0; i < total; i++) {

    let img = document.createElement("img");
    let index;

    do {
        index = Math.floor(Math.random() * images.length);
    } while (
        images[index] === gridMap[i - 1] ||         // слева
        images[index] === gridMap[i - cols]         // сверху
    );

    img.src = images[index];
    gridMap[i] = images[index];

    img.className = "tile";
    img.style.animationDelay = (i * 0.01) + "s";

    img.addEventListener("click", (e) => {

        modal.style.display = "flex";
        modalImg.src = img.src;

        requestAnimationFrame(() => {
            modal.classList.add("show");
        });

        createParticles(e.clientX, e.clientY);
    });

    grid.appendChild(img);
}

/* ЗАКРЫТИЕ */
modal.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.classList.add("hide");

    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
    }, 300);
});

/* МУЗЫКА */
let playing = false;

musicBtn.addEventListener("click", () => {
    if (!playing) {
        music.play();
        musicBtn.textContent = "I'll wait for you";
    } else {
        music.pause();
        musicBtn.textContent = "月亮代表我的心 - Teresa Teng";
    }
    playing = !playing;
});

/* ЧАСТИЦЫ */
function createParticles(x, y) {
    for (let i = 0; i < 20; i++) {

        const p = document.createElement("div");
        p.className = "particle";

        document.body.appendChild(p);

        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.background = `hsl(${Math.random()*360},100%,60%)`;

        let angle = Math.random() * Math.PI * 2;
        let distance = 50 + Math.random() * 80;

        let dx = Math.cos(angle) * distance;
        let dy = Math.sin(angle) * distance;

        p.animate([
            { transform: "translate(0,0)", opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
        ], {
            duration: 700,
            easing: "ease-out"
        });

        setTimeout(() => p.remove(), 700);
    }
}

/* ПАРАЛЛАКС */
document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth - 0.5) * 25;
    let y = (e.clientY / window.innerHeight - 0.5) * 25;

    heart.style.transform = `translate(${x}px, ${y}px) scale(1)`;
});