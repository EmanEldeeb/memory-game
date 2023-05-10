const userName = document.querySelector(".name > span");
const startBtn = document.getElementById("start");
const gameControls = document.querySelector(".game-controls");
const imageBoxs = document.querySelectorAll(".image-box");
const gameBoard = document.querySelector(".game-board");
const triescounst = document.querySelector(".tries >span");
const resultbackground = document.querySelector(".result");
const failmessage = document.querySelector(".fail");
const successmessage = document.querySelector(".success");
const succesAudio = document.getElementById("success-audio");
const failaudio = document.getElementById("fail-audio");
const duration = 1500;
const maxTries = 5;

// start the game
startBtn.addEventListener("click", () => {
  gameControls.classList.add("hidden");
  const playerName = prompt("enter your name to start");
  if (!playerName || playerName === "") {
    userName.textContent = "unkown";
  } else {
    userName.textContent = playerName;
  }
  //catch and remember :)
  imageBoxs.forEach((box) => {
    box.classList.add("flipped");
    setTimeout(() => {
      box.classList.remove("flipped");
    }, duration);
  });
});

const randomOrderArray = Array.from(imageBoxs.keys());
suffle(randomOrderArray);
console.log(randomOrderArray);
//suffle array order
function suffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
//random boxs order
imageBoxs.forEach((box, index) => {
  box.style.order = randomOrderArray[index];
  box.addEventListener("click", () => {
    flipbox(box);

    const checksuccess = Array.from(imageBoxs).filter((box) =>
      box.classList.contains("match")
    );
    if (checksuccess.length === imageBoxs.length) {
      console.log("succes");
      showresult(successmessage, failmessage);
      succesAudio.play();
    }
  });
});
// flipping mechanism
function flipbox(box) {
  box.classList.add("flipped");
  const flippedboxs = Array.from(imageBoxs).filter((box) =>
    box.classList.contains("flipped")
  );
  console.log(flippedboxs);
  if (flippedboxs.length === 2) {
    stopflipping();
    matchedbox(flippedboxs[0], flippedboxs[1]);
  }
}
function stopflipping() {
  gameBoard.classList.add("preventflipping");
  setTimeout(() => {
    gameBoard.classList.remove("preventflipping");
  }, duration);
}
//match box or reset these boxs
function matchedbox(firstBox, secondBox) {
  if (firstBox.dataset.card === secondBox.dataset.card) {
    firstBox.classList.remove("flipped");
    secondBox.classList.remove("flipped");
    firstBox.classList.add("match");
    secondBox.classList.add("match");
    succesAudio.play();
  } else {
    failaudio.play();
    triescounst.textContent = parseInt(triescounst.textContent) + 1;
    if (parseInt(triescounst.textContent) === maxTries) {
      showresult(failmessage, successmessage);
      failaudio.play();
    }

    setTimeout(() => {
      firstBox.classList.remove("flipped");
      secondBox.classList.remove("flipped");
    }, duration);
  }
}

//print result message
function showresult(resultmessage, hiddenmessage) {
  imageBoxs.forEach((box) => box.classList.remove("match"));
  triescounst.textContent = 0;
  resultbackground.classList.remove("hidden");
  console.log(resultmessage);
  hiddenmessage.classList.add("hidden");
  resultmessage.classList.remove("hidden");
  resultmessage.addEventListener("click", () => {
    resultbackground.classList.add("hidden");
    gameControls.classList.remove("hidden");
  });
}
