const RAND_QUOTE = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
// wpm counter
const textareaElement = document.querySelector("textarea");
const WPM = document.getElementById("WPM");
// timer counter

let startTime;

function startTimer() {
  startTime = new Date();
  timerElement.textContent = 0;
  setInterval(() => {
    timer.textContent = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

textareaElement.addEventListener("keyup", checkSpeed);

let iLastTime = 0;
let iTime = 0;
let iTotal = 0;
let iKeys = 0;

function checkSpeed() {
  iTime = new Date().getTime();

  if (iLastTime != 0) {
    iKeys++;
    iTotal += iTime - iLastTime;
    iWords = textareaElement.value.split(/\s/).length;
    WPM.innerHTML = Math.round((iKeys / iTotal) * 6000, 2);
    //WPM.innerHTML = Math.round((iWords / iTotal) * 6000, 2);
  }

  iLastTime = iTime;
}

quoteInputElement.addEventListener("input", () => {
  const spanArray = quoteDisplayElement.querySelectorAll("span");
  const inputValArray = quoteInputElement.value.split("");
  var correct = true;
  spanArray.forEach((characterSpan, index) => {
    const character = inputValArray[index];
    if (character == null) {
      characterSpan.classList.remove("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    } else if (characterSpan.innerText === character) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else if (characterSpan.innerText !== character) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) {
    getnextQuote();
  }
});

// fetch json data from api
function getRandomQuote() {
  return fetch(RAND_QUOTE)
    .then(response => response.json())
    .then(data => data.content);
}

async function getnextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quoteInputElement.value = null;
  startTimer();
  quote.split("").forEach(char => {
    const charSpan = document.createElement("span");
    charSpan.textContent = char;
    quoteDisplayElement.appendChild(charSpan);
  });
}

getnextQuote();
