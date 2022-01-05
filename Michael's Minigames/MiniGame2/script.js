// Setting elements to variables
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const bodyElement = document.getElementsByTagName('body')
const nextGameButtonElement = document.getElementById('nextgame-btn')

// Declaring questions, shuffled questions, and current question
let shuffledQuestions, currentQuestionIndex, leftImage, rightImage
const questions = [
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Plane rides more than 6 hours', correct: false, carbon: "Carbon Amount: 150 per km", image: 'Images/6HourPlane.png'},
            { text: 'International Railways', correct: true, carbon: "Carbon Amount: 6 per km", image: 'Images/InternationalTrain.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Electric Cars', correct: true, carbon: "Carbon Amount: 53 per km", image: 'Images/ElectricCar.png'},
            { text: 'Cars', correct: false, carbon: "Carbon Amount: 180 per km", image: 'Images/Car.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Plane rides less than 3 hours', correct: true, carbon: "Carbon Amount: 156 per km", image: 'Images/3HourPlane.png'},
            { text: 'Plane rides more than 6 hours', correct: false, carbon: "Carbon Amount: 150 per km", image: 'Images/6HourPlane.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Cars', correct: false, carbon: "Carbon Amount: 180 per km", image: 'Images/Car.png'},
            { text: 'Bus', correct: true, carbon: "Carbon Amount: 105 per km", image: 'Images/Bus.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Cars', correct: false, carbon: "Carbon Amount: 180 per km", image: 'Images/Car.png'},
            { text: 'Car ride with 2 people', correct: true, carbon: "Carbon Amount: 96 per km", image: 'Images/2Car.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Cars', correct: false, carbon: "Carbon Amount: 180 per km", image: 'Images/Car.png'},
            { text: 'Motorcycle', correct: true, carbon: "Carbon Amount: 103 per km", image: 'Images/Motorcycle.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Cars', correct: true, carbon: "Carbon Amount: 180 per km", image: 'Images/Car.png'},
            { text: 'Electric Scooters', correct: false, carbon: "Carbon Amount: 202 per km", image: 'Images/ElectricScooter.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Walking', correct: true, carbon: "Carbon Amount: 0.1 per km", image: 'Images/Walk.png'},
            { text: 'Biking', correct: false, carbon: "Carbon Amount: 5 per km", image: 'Images/Bike.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Hybrid Cars', correct: true, carbon: "Carbon Amount: 44 per km", image: 'Images/HybridCar.png'},
            { text: 'Electric Cars', correct: false, carbon: "Carbon Amount: 53 per km", image: 'Images/ElectricCar.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'In country Railways', correct: true, carbon: "Carbon Amount: 41 per km", image: 'Images/InCountryTrain.png'},
            { text: 'Electric Cars', correct: false, carbon: "Carbon Amount: 53 per km", image: 'Images/ElectricCar.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Ferry', correct: true, carbon: "Carbon Amount: 19 per km", image: 'Images/Ferry.png'},
            { text: 'In country railways', correct: false, carbon: "Carbon Amount: 41 per km", image: 'Images/InCountryTrain.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Electric Scooters', correct: false, carbon: "Carbon Amount: 202 per km", image: 'Images/ElectricScooter.png'},
            { text: 'Electric Cars', correct: true, carbon: "Carbon Amount: 53 per km", image: 'Images/ElectricCar.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Electric Scooters', correct: false, carbon: "Carbon Amount: 202 per km", image: 'Images/ElectricScooter.png'},
            { text: 'Plane Rides more than 6 hours', correct: true, carbon: "Carbon Amount: 150 per km", image: 'Images/6HourPlane.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'Biking', correct: true, carbon: "Carbon Amount: 5 per km", image: 'Images/Bike.png'},
            { text: 'Ferry', correct: false, carbon: "Carbon Amount: 19 per km", image: 'Images/Ferry.png'}
        ]
    },
    {
        question: 'Which is better for the environment?',
        answer: [
            { text: 'International Railways', correct: false, carbon: "Carbon Amount: 6 per km", image: 'Images/InternationalTrain.png'},
            { text: 'Biking', correct: true, carbon: "Carbon Amount: 5 per km", image: 'Images/Bike.png'}
        ]
    },
]

// Starting and sorting through questions
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


// Shuffling and showing questions
function startGame () {
    nextGameButtonElement.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0 
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

// Setting questions 
function setNextQuestion() {
    display = true
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]) 
    nextButton.classList.add('hide')
}

// Showing question, adding correct buttons, and showing background image that corresponds with button 
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button') 
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button) 
    })
    displayBackgroundImage(question.answer[0].image, question.answer[1].image);
}

// Displaying background images
function displayBackgroundImage(srcLeft, srcRight) {
    leftImage = document.createElement("img")
    rightImage = document.createElement('img')
    leftImage.src = srcLeft
    rightImage.src = srcRight
    leftImage.width = 500
    leftImage.height = 500 
    leftImage.style.left = '150px'
    leftImage.style.position = 'fixed'
    leftImage.style.zIndex = '-1'
    leftImage.style.backgroundRepeat = 'no-repeat'
    rightImage.width = 500
    rightImage.height = 500 
    rightImage.style.left = '900px'
    rightImage.style.position = 'fixed'
    rightImage.style.zIndex = '-1'
    rightImage.style.backgroundRepeat = 'no-repeat'
    document.body.appendChild(leftImage)
    document.body.appendChild(rightImage)
}

// Remove answers from correct and wrong list, hiding button, and removes answers
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// Adding selected answer to correct list if correct and checks if next button is applicable otherwise show restart
// Shows carbon amount once and removes images upon clicking
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct) 
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerHTML = 'Restart'
        startButton.classList.remove('hide')
        nextGameButtonElement.classList.remove('hide')
        nextGameButtonElement.addEventListener("click", () => window.location.href = "/William's Minigames/game3.html")
    }
    displayCarbonAmountOnce()
    display = false
    removeImage()
}

// Ensures that carbon amount is displayed once
function displayCarbonAmountOnce() {
    if (display) {
        showCarbonAmount(shuffledQuestions[currentQuestionIndex])
    }
}

// Shows carbon amount
function showCarbonAmount(question) {
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.carbon
        button.classList.add('btn')
        answerButtonsElement.appendChild(button)  
        button.style.background = 'gray'
    })
}

// Adds correct elements to correct list to show correct background color 
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')     
    } else {
        element.classList.add('wrong')
    } 
}

// Clears the correct and wrong list of answers
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Removes background images 
function removeImage() {
    leftImage.classList.add('hide')
    rightImage.classList.add('hide')
}

