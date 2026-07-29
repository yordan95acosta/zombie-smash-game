const zombies = document.querySelectorAll(".zombie");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

const startButton = document.getElementById("start");

let score = 0;
let time = 30;

let gameRunning = false;

let timer;
let zombieTimer;

function randomZombie() {

    if (!gameRunning) return;

    zombies.forEach(z =>
        z.classList.remove("active")
    );

    let random = Math.floor(Math.random() * zombies.length);

    zombies[random].classList.add("active");
}

function startGame() {

    startButton.disabled = true;

    score = 0;
    time = 30;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    gameRunning = true;

    clearInterval(timer);
    clearInterval(zombieTimer);

    zombieTimer = setInterval(randomZombie, 800);

    timer = setInterval(() => {

        time--;

        timeDisplay.textContent = time;

        if (time <= 0) {

            zombies.forEach(z => {
                z.classList.remove("active");
            });

            clearInterval(timer);
            clearInterval(zombieTimer);

            gameRunning = false;

            startButton.disabled = false;

            alert("Game Over! Score: " + score);
        }

    }, 1000);
}

zombies.forEach(zombie => {

    zombie.addEventListener("click", () => {

        if (gameRunning && zombie.classList.contains("active")) {

            score++;

            scoreDisplay.textContent = score;

            scoreDisplay.animate(
                [
                    { transform: "scale(1.4)" },
                    { transform: "scale(1)" }
                ],
                {
                    duration: 150
                }
            );

            if (score > 0 && score % 10 === 0) {

                clearInterval(zombieTimer);

                zombieTimer = setInterval(
                    randomZombie,
                    Math.max(250, 800 - score * 10)
                );
            }

            zombie.classList.add("hit");

            setTimeout(() => {

                zombie.classList.remove("active");
                zombie.classList.remove("hit");

            }, 200);
        }

    });

});

startButton.addEventListener("click", startGame);
