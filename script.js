let gameSeq= [];
let userSeq = [];

let btns =["yellow" , "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;
        
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout( function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout( function() {
        btn.classList.remove("userflash");
    },250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx= Math.floor(Math.random() *3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Play wrong sound
        wrongSound.currentTime = 0;
        wrongSound.play();

        h2.innerHTML = `GAME OVER! <br> YOUR SCORE WAS <b>${level}</b> <br> PRESS ANY KEY TO START`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        }, 150);
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
const clickSound = new Audio("src/sound.wav");
clickSound.volume = 0.2;

const wrongSound = new Audio("src/wrong.wav");
wrongSound.volume = 0.2;

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    clickSound.currentTime = 0;
    clickSound.play();
    checkAns(userSeq.length - 1);
}

const glowCursor = document.querySelector(".glow-cursor");

document.addEventListener("mousemove", (e) => {
  glowCursor.style.left = `${e.clientX}px`;
  glowCursor.style.top = `${e.clientY}px`;
});

