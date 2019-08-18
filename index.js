'use strict';

const store = [
  {
    question: 'What mainstream Anime does the character All-Might appear in?',
    answers: ['Naruto', 'Seven Deadly Sins', 'My Hero Academia', 'Castlevania'],
    correctAnswer: 2
  },
  {
    question: 'What popular video game series has a species of beings called “Moogles”?',
    answers: ['Pokemon', 'Final Fantasy', 'Halo', 'Red Dead'],
    correctAnswer: 1
  },
  {
    question: 'What is Master Chiefs given spartan number in the Halo Series?',
    answers: ['120', '369', '808', '117'],
    correctAnswer: 3
  },
  {
    question: 'What does Rick from popular show Rick and Morty mean when he says “Wubba Lubba Dub Dub”?',
    answers: ['I love you!', 'What in the actual heck is happening?', 'I am in great pain, please help me!', 'Yeet, its lit fam!'],
    correctAnswer: 2
  },
  {
    question: 'In the anime Gurren Lagaan the character Kamina has a catch phrase, what is it?',
    answers: ['Just who in the hell do you think I am?!', 'Its ok sugar maybe next time', '*sobbs uncontrollably* i just can’t do it', 'ITS PIZZA TIME MY DUDES!!! GET READY!'],
    correctAnswer: 0
  },
  {
    question: 'In the move Pokemon Mewtwo Returns what does Brock(no relation) use to keep dry from the storm?',
    answers: ['Umbrella', 'Rain Coat', 'Trusty frying pan as a drying pan', 'A quilt his mother made him when he was young'],
    correctAnswer: 1
  },
  {
    question: 'In the popular anime Evangelion what are the enemies called?',
    answers: ['Heathens', 'Demons', 'Angels', 'No good dirty rotten Ninny Muffins'],
    correctAnswer: 2
  },
  {
    question: 'In the movie Princess Mononoke what kind of animal does Ashitaka ride?',
    answers: ['Giant White Wolf', 'Red Elk', 'No-Face Demon', 'Black Horse of the Apocalypse'],
    correctAnswer: 1
  },
];

let currentQuestion = 0;

function startQuizAtStart() {
  // begin quiz, reveal submit button, and hide start page
  $('#startPage').on('click', '#start-button', event => {
    $('#startPage').addClass('hidden');
    $('#questionPage').removeClass('hidden');
    $('#submitAnswer').removeClass('hidden');
  });
}


function renderQuestions() {
  // populate questions and answers from array of questions and answers
  const answer1 = `${store[currentQuestion].answers[0]}`;
  const answer2 = `${store[currentQuestion].answers[1]}`;
  const answer3 = `${store[currentQuestion].answers[2]}`;
  const answer4 = `${store[currentQuestion].answers[3]}`;
  const questionText = `<legend>${currentQuestion+1}/8: ${store[currentQuestion].question}<legend>`;
  const answersText = 
    `<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
    <input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
    <input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
    <input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
  $('.nerdQuestion').html(questionText);
  $('.nerdAnswers').html(answersText);
  $('.nerdScore').html(`${userScore.correct} correct / ${userScore.incorrect} incorrect`);
  enableSubmitButton();
}

function enableSubmitButton() {
  // restore submit button after disabling it
  $('input[name=option]').on('click', function(event) {
    $('#submitAnswer').removeClass('disabled').removeAttr('disabled');
  });
}

function submitQuizAnswer() {
  // submit selected answer, disable radio buttons
  $('#submitAnswer').click(function(event) {
    event.preventDefault();
    evaluateAnswers();
    $('#submitAnswer').addClass('hidden');
    $('#nextQuestion').removeClass('hidden');
    $('input[type=radio]').attr('disabled', true);
  });
}

function evaluateAnswers() {
  //check for correct answer and display results and/or correct answer, also display updated score
  let radioValue = $('input[name=option]:checked').val();

  console.log('radio value', radioValue);
  console.log('correct answer', store[currentQuestion].correctAnswer);

  if (store[currentQuestion].answers.indexOf(radioValue) === store[currentQuestion].correctAnswer) {
    userScore.correct++;
    console.log(userScore.correct);
    $('#feedbackCorrect').removeClass('hidden');
  }
  
   else {
    userScore.incorrect++;
    getCorrectAnswer();
    console.log(userScore.incorrect);
    $('#feedbackIncorrect').removeClass('hidden');
  }
} 
  
let userScore = {
  correct: 0,
  incorrect: 0,
};

function getCorrectAnswer() {
  //create text for incorrect result including correct answer
  let popupAnswerText = `<h3>Incorrect! But don't worry, be frappe!<br>The correct answer is: ${store[currentQuestion].correctAnswer}.</h3><br>`;
  $('#feedbackIncorrect').html(popupAnswerText);
} 
        
function advanceToNextQuestion() {
  // advance user to the next question or show final score depending on current question 
  $('#nextQuestion').on('click', function(event) {
    if (currentQuestion < store.length-1) {
      currentQuestion++;
      renderQuestions();
      resetQuestion();
    } else {
      showFinalScore();
    } 
  });
}
  
function resetQuestion() {
  // reset question and answers, remove previous results and swap submit and next buttons
  $('input[type=radio]').attr('disabled', false);
  $('#nextQuestion').addClass('hidden');
  $('#submitAnswer').removeClass('hidden');
  $('#feedbackCorrect').addClass('hidden');
  $('#feedbackIncorrect').addClass('hidden');
  $('#submitAnswer').addClass('disabled');
  $('#submitAnswer').attr('disabled', 'disabled');
}
  
function showFinalScore() {
  // hide submit button and display final page with final score
  $('#submitAnswer').addClass('hidden');
  $('#finalPage').removeClass('hidden');
  $('#questionPage').addClass('hidden');
  let finalScoreText = `<h3>You answered ${userScore.correct} out of 8 questions correctly!</h3>`;
  $('#finalCorrect').append(finalScoreText);
}
  
function restartQuiz() {
  // takes user back to start upon click
  $('#retake').click(function() {
    location.reload();
  });
}
  
function handleQuizFunctions() {
  startQuizAtStart();
  renderQuestions();
  submitQuizAnswer();
  advanceToNextQuestion();
  restartQuiz();
  enableSubmitButton();
}
  
$(handleQuizFunctions);