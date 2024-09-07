// Array of questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve or initialize userAnswers from sessionStorage
const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];

// Render the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear previous questions

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.classList.add('question');

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Save the user’s answers to sessionStorage
function saveUserAnswers() {
  const answers = [];
  for (let i = 0; i < questions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    if (selectedOption) {
      answers[i] = selectedOption.value;
    } else {
      answers[i] = null;
    }
  }
  sessionStorage.setItem('userAnswers', JSON.stringify(answers));
}

// Calculate the user's score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const selectedAnswer = userAnswers[i];
    if (selectedAnswer === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Handle the submit button click event
function handleSubmit() {
  saveUserAnswers();
  const score = calculateScore();
  document.getElementById('score').textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score);
}

// Add event listener for submit button
document.getElementById('submit').addEventListener('click', handleSubmit);

// Initial render of questions
renderQuestions();
