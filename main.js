const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion;
let indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
btnTryAgain = document.getElementById('btn-try-again');
 const questions = [
    {
        question: 'Внутри какого HTML элемента помещается JavaScript?',
        options: [
            'javascript',
            'js',
            'script',
            'scripting',
        ],
        rightAnswer: 2
    },
    {
        question: 'Где находится правильное место для вставки JavaScript?',
        options: [
            'В секции head',
            'В секции body',
            'Как в секции body так и в head',
            'Его не нужно вставлять',
        ],
        rightAnswer: 1
    },
    {
        question: 'Как написать оператор IF в JavaScript?',
        options: [
            'if i == 5 then',
            'if i = 5 then',
            'if = 5',
            'if (i == 5)',
        ],
        rightAnswer: 3
    }
 ];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [];


const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
        completedAnswers.forEach(item => {
            if(item == randomNumber) {
                hitDuplicate = true;

            }
        });
        if(hitDuplicate) {
            randomQuestion();
        } else {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    if(completedAnswers.length == 0) {
        indexOfQuestion = randomNumber;
        load ();
    }
    }

    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion ();
        enableOptions ();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnNext.addEventListener('click', () => {
    validate ();
})

window.addEventListener('load', () => {
   randomQuestion();
   answerTracker();
})