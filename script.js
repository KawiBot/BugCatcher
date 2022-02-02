const screens = document.querySelectorAll(".screen");
const chooseInsectBtns = document.querySelectorAll(".choose-insect-btn");
const startBtn = document.getElementById("start-btn");
const timeEle = document.getElementById("time");
const scoreEle = document.getElementById("score");
const messageEle = document.getElementById("message");
const gameContainer = document.querySelector(".game-container");
let seconds = 0;
let score = 0;
//Image source and Image Alt
let selectedInsect = {};

startBtn.addEventListener("click", () => screens[0].classList.add("up"));

chooseInsectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selectedInsect = { src, alt };
    screens[1].classList.add("up");
    setInterval(() => {
      createInsect();
    }, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(() => {
    increaseTime();
  }, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEle.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}
function createInsect() {
  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" alt="${
    selectedInsect.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />`;
  insect.addEventListener("click", catchInsect);
  gameContainer.appendChild(insect);
}

function getRandomLocation() {
  // Need to make sure it gets placed in the window
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Don't want it to be off the edge
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => {
    this.remove();
  }, 2000);
  addInsects();
}

function addInsects() {
  setTimeout(() => {
    createInsect();
  }, 1000);
  setTimeout(() => {
    createInsect();
  }, 1500);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add("visible");
  }
  scoreEle.innerHTML = `Score: ${score}`;
}
