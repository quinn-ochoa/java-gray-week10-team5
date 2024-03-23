let a;
let b;
let score = 0;
let countProblem = 0;

const quizQuestion = {
    question: '',
    correctAnswer: 0
};


function multiplication(a, b){
    return a * b;
}

/**
 * Utility function to generate a random number based on max
 * @param {number} max
 */
function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
 * Utility function to shuffle the items in an array
 * @param {object} arr
 */
function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
  }

function displayMath(x, y) {
    const expression = document.querySelector('.expression');
    expression.innerText = x + ' * ' + y;
}

function updateProblemCount(){
    countProblem++;
    if(countProblem < 11){
        const currentProb = document.querySelector('.currentProblem');
        currentProb.innerText = countProblem;
    }
}

function resetCounts(){
    const currentScore = document.querySelector('.currentScore');
    score = 0;
    currentScore.innerText = score;

    const currentProb = document.querySelector('.currentProblem');
    countProblem = 1;
    currentProb.innerText = countProblem;
}

function displayOptions() {
    // The reason we use a set is to avoid duplicates 
    let resSet = new Set();
    const options = document.querySelectorAll('li');
    
    a = getRandomNumber(10);
    b = getRandomNumber(10);
    const solution = multiplication(a,b);

    //store in obj the question and correct answer
    quizQuestion.question = a + ' * ' + b;
    quizQuestion.correctAnswer = solution;

    //add the correct answer to the array
    resSet.add(solution);

    while(resSet.size < 4){
        resSet.add(getRandomNumber(82));
    }

    // The reason we convert the set to an array is because the 
    // shuffleArray function was designed to handle an array
    resArr = Array.from(resSet);
    shuffleArray(resArr);
    for(let i = 0; i < 4; i++) {
        options[i].innerText = resArr[i];
    }
    displayMath(a,b);
}

function toggleQuiz() {
    const hideElements = document.querySelectorAll('.show-hide');
    hideElements.forEach((hideElement) => {
        if (hideElement.style.display != 'none'){
            hideElement.style.display = 'none';
        } else {
            hideElement.style.display = 'block';
        }
        
    })    
}

document.addEventListener('DOMContentLoaded', () => {

    const selections = document.querySelectorAll('li');
    const currentScore = document.querySelector('.currentScore');
    const startOverButton = document.querySelector('#btnStartOver');
    
    displayOptions();
    updateProblemCount();
        
    selections.forEach((selection) => {
        selection.addEventListener('click', (e) => {

            // check the whether user's answer is correct or not 
            if(e.target.innerText == quizQuestion.correctAnswer) {
                score++;
                currentScore.innerText = score;
            }
            
            // set up the next problem 
            displayOptions();
            updateProblemCount();

            if(countProblem > 10) {
                toggleQuiz();
            }  
        });     
    });

    startOverButton.addEventListener('click', () => {
        toggleQuiz();   
        resetCounts();
    })

    // restart the problem and the score once 'Start over' is clicked
    // const startOver = document.getElementById('btnStartOver');
    // startOver.addEventListener('click', () => {
    //     reset();
    //     displayOptions();
    //     countProblem = 1;
    //     currentProb.innerText = countProblem;
    //     score = 0;
    //     currentScore.innerText = score;
        
    // })

});