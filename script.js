const sessionAmount = 0.1;

const bells = new Audio("./sounds/bell.wav");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
const startBtn = document.getElementById("btn-start");
const restartBtn = document.getElementById("btn-restart");

/** @type {"not-started" | "running" | "paused"} */
let state = "not-started";
let myInterval;
let totalSeconds = sessionAmount * 60;

function updateSeconds() {
  if (totalSeconds <= 0) {
    bells.play();
    clearInterval(myInterval);
    restartTimer();
  }

  const secondsLeft = totalSeconds % 60;
  const minutesLeft = Math.floor(totalSeconds / 60);

  secondDiv.textContent = secondsLeft.toString().padStart(2, "0");
  minuteDiv.textContent = minutesLeft.toString().padStart(2, "0");
}
updateSeconds();

function appTimer() {
  switch (state) {
    // Pause when running
    case "running":
      state = "paused";
      startBtn.innerText = "Resume";
      clearInterval(myInterval);
      break;

    // Restart totalSeconds and show restartBtn when not-started
    case "not-started":
      totalSeconds = sessionAmount * 60;
      restartBtn.classList.remove("hidden");
    /* falls through */

    // Start the timer when paused or not-started
    case "paused":
      state = "running";
      startBtn.innerText = "Pause";

      myInterval = setInterval(() => {
        totalSeconds--;
        updateSeconds();
      }, 1000);
  }
}
startBtn.addEventListener("click", appTimer);

function restartTimer() {
  restartBtn.classList.add("hidden");
  if (state === "not-started") return;

  clearInterval(myInterval);
  state = "not-started";
  totalSeconds = sessionAmount * 60;
  startBtn.innerText = "start";
  updateSeconds();
}
restartBtn.addEventListener("click", restartTimer);
