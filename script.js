const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');
const percentageElement = document.getElementById('percentage');
const element1Button = document.getElementById('element1');
const element2Button = document.getElementById('element2');

//const elements = [
//  '', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
  // ... continue with the rest of the element symbols up to element 118.
//];

const elements = [
  '', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
  'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
  'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr',
  'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt',
  'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr',
  'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
];




let gameTime = 45;
let score = 0;
let attempts = 0; // Add this line
let percentage = 0; // Add this line
let timerInterval;

function startGame() {
  gameTime = 45;
  score = 0;
  updateScore(0);
  updateTimer(gameTime);
  
  newQuestion();
  timerInterval = setInterval(() => {
    gameTime--;
    updateTimer(gameTime);
    if (gameTime <= 0) {
      endGame();
    }
  }, 1000);
}

function newQuestion() {
  let maxElementIndex;

  if (score < 10) {
    maxElementIndex = 20;
  } else if (score < 30) {
    maxElementIndex = 40;
  } else if (score < 50) {
    maxElementIndex = 60;
  } else {
    maxElementIndex = elements.length - 1;
  }

  let element1 = Math.floor(Math.random() * maxElementIndex) + 1;
  let element2 = Math.floor(Math.random() * maxElementIndex) + 1;

  // Ensure that the two elements are never the same
  while (element1 === element2) {
    element2 = Math.floor(Math.random() * maxElementIndex) + 1;
  }
  
  element1Button.textContent = elements[element1];
  element1Button.dataset.atomicNumber = element1;
  element2Button.textContent = elements[element2];
  element2Button.dataset.atomicNumber = element2;
}

function checkAnswer(choice) {
  const element1 = parseInt(element1Button.dataset.atomicNumber);
  const element2 = parseInt(element2Button.dataset.atomicNumber);
  
  if ((choice === 1 && element1 > element2) || (choice === 2 && element2 > element1)) {
    score++;
    updateScore(score);
  }

  attempts++; // Add this line
  updateAttempts(attempts); // Add this line

  percentage = (score / attempts) * 100; // Add this line
  updatePercentage(percentage); // Add this line

  newQuestion();
}

function updateAttempts(attempts) {
  attemptsElement.textContent = `Attempts: ${attempts}`;
}

function updatePercentage(percentage) {
  percentageElement.textContent = `Percentage: ${percentage.toFixed(2)}%`;
}


function updateScore(score) {
  scoreElement.textContent = `Score: ${score}`;
}

function updateTimer(time) {
  timerElement.textContent = `Time: ${time}`;
}

function endGame() {
  clearInterval(timerInterval);
  alert(`Game Over! Your score: ${score}`);
}

