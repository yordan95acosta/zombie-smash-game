const zombies = document.querySelectorAll(".zombie");
const holes = document.querySelectorAll(".hole");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

const startButton = document.getElementById("start");


let score = 0;
let time = 30;

let gameRunning = false;

let timer;


function randomZombie(){

    if(!gameRunning)
        return;


    zombies.forEach(z =>
        z.classList.remove("active")
    );


    let random =
    Math.floor(Math.random()*zombies.length);


    zombies[random].classList.add("active");


}


function startGame(){

    score = 0;
    time = 30;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;


    gameRunning=true;


    let zombieTimer =
    setInterval(randomZombie,800);


    timer=setInterval(()=>{

        time--;

        timeDisplay.textContent=time;


        if(time<=0){

            clearInterval(timer);
            clearInterval(zombieTimer);

            gameRunning=false;

            alert(
              "Game Over! Score: " + score
            );

        }


    },1000);

}



zombies.forEach(zombie=>{


    zombie.addEventListener("click",()=>{


        if(gameRunning && zombie.classList.contains("active")){


            score++;

            scoreDisplay.textContent=score;


            zombie.classList.remove("active");

        }


    });


});


startButton.addEventListener(
    "click",
    startGame
);
