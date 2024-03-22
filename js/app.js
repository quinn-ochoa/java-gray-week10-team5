let a;
let b;
let score = 0;

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


function displayOptions() {
    let resSet = new Set();
    const options = document.querySelectorAll('li');
    resSet.clear();
    
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
    resSet = Array.from(resSet);
    shuffleArray(resSet);
    for(let i = 0; i < 4; i++) {
        options[i].innerText = resSet[i];
    }
    displayMath(a,b);

}


function reset() {

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
    const userOption = document.querySelector('#answers');
    const currentScore = document.querySelector('.currentScore');
    const currentProb = document.querySelector('.currentProblem');
    
    let countProblem = 1;

    displayOptions();
        
    selections.forEach((selection) => {
        selection.addEventListener('click', (e) => {
            
            if(countProblem <= 10) {
                //keep track of user's score
                if(e.target.innerText == quizQuestion.correctAnswer) {
                    // console.log(e.target.innerText);
                    // console.log("correct answer: " + quizQuestion.correctAnswer);
                    score++;
                    currentScore.innerText = score;
    
                }
                
                displayOptions();
                currentProb.innerText = countProblem;
                countProblem++;
            }
            if(countProblem > 10) {
                reset();
            } 
             
        });
            
    });

    //restart the problem and the score once 'Start over' is clicked
    const startOver = document.getElementById('btnStartOver');
    startOver.addEventListener('click', () => {
        reset();
        displayOptions();
        countProblem = 1;
        currentProb.innerText = countProblem;
        score = 0;
        currentScore.innerText = score;
        
    })

});