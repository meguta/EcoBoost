
const startButton = document.getElementById('startButton')
const nextButton = document.getElementById('nextButton')
const questionContainer = document.getElementById('questionContainer')
const questionElement = document.getElementById('question')
const optionButtons = document.getElementById('optionButtons')
const scoreContainer = document.getElementById('scoreContainer')
const counter = document.getElementById('counter')
const instructions = document.getElementById('instructions')
const restartScreen = document.getElementById("restartScreen")
const congratsScreen = document.getElementById("congratsScreen")
var buttonSound1 = document.getElementById('audio1')
var correctChoice = document.getElementById('audio2')
var wrongChoice = document.getElementById('audio3')
let active = true

// Gets the id of the container and changes the content within 

    let shuffledQuestions, currentQuestionIndex, score = 0

    const questions = [
      {
        question: 'Which is the Cleaner Energy?',
        answers: [
          { text: 'Solar', src:'Assets/SOLAR.png' ,correct: true },
          { text: 'Coal', src:'Assets/COAL.png' ,correct: false }
        ]
      },
      {
        question: 'Which is the Cleaner Energy?',
        answers: [
          { text: 'Hydro',src:'Assets/HYDRO.png', correct: true },
          { text: 'Petroleum',src:'Assets/PETROLEUM.jpg' , correct: false },

        ]
      },
      {
        question: 'Which is the Cleaner Energy?',
        answers: [
          { text: 'Wind', src:'Assets/WIND.png' ,correct: true },
          { text: 'Natural Gases', src:'Assets/NATURALGAS.jpg' ,correct: false },
        ]
      },
      {
        question: 'Which is the Cleaner Energy?',
        answers: [
          { text: 'Nuclear',src:'Assets/NUCLEAR.png' , correct: false },
          { text: 'Biomas', src:'Assets/SOLAR.png' ,correct: true }
        ]
      },
      {
         question: 'Which is the Cleaner Energy?',
         answers: [
           { text: 'Uranium', src:'Assets/URANIUM.png' ,correct: false },
           { text: 'Geothermal', src:'Assets/SOLAR.png' ,correct: true }
         ]
       }

// https://www.google.com/search?q=coal+pixel+art&sxsrf=AOaemvJNuaTvEntDPlONWQBj2ipd-lYLEA:1639154412261&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjNmOWD1tn0AhUBCM0KHaD2CaUQ_AUoAXoECAEQAw&biw=1396&bih=695&dpr=2#imgrc=86Iz68C_tna3gM
      
    ]
    // =============== SOUND EFFECTS ============ 
    function playButtonSound(){ 
      buttonSound1.play()
    }
    function playCorrectSound(){ 
      correctChoice.play()
    }
    function playWrongSound(){ 
      wrongChoice.play()
    }
    // =============== Event listener to start game  and show instructions 
    
    startButton.addEventListener('click', () => { playButtonSound(), showInstructions()} )  
    // Increments to the next question on "click"
    // As soon as the game starts function starts 
    nextButton.addEventListener('click', () => {
      playButtonSound() 
      currentQuestionIndex++
      active = true 
      setNextQuestion() 
    })
    
    //Function to hide elements 
    function hideDiv(e){ 
      e.classList.add('hide')
    }
     //Function to show elements 
    function showDiv(e){ 
      e.classList.remove("hide")
    }
    
   
    //Show instruction of the game start game when start is pressed 
    function showInstructions() {
        instructions.classList.remove('hide')
        startButton.addEventListener('click', function(){ 
                playButtonSound()              
                startGame() 
                hideDiv(instructions)
              })}
      
   //------------------- Function to start the game  --------------------
    
    function startGame() {
      // .classList is a read only property that can be used with .add(), .remove(), .replace(), .toggle()
      hideDiv(startButton)
      hideDiv(nextButton)
      shuffledQuestions = questions.sort(() => Math.random() - .5)
      currentQuestionIndex = 0
      showDiv(questionContainer)
      showDiv(scoreContainer)
      showDiv(counter)
      counter.innerHTML = score
      //counter.write('score')
      setNextQuestion()
    }
    
    // ----------------- Function to show questions -------------------------
    function showQuestion(question) {
      questionElement.innerText = question.question
      question.answers.forEach(answer => {
        const container = document.createElement('div')
        const card = document.createElement('div')
        const flipCardFront = document.createElement('div')
        const flipCardBack = document.createElement('div')
        const img = document.createElement('img')
        const text = document.createElement('div')
        img.src = answer.src
        text.innerText = answer.text
        container.appendChild(card)
        card.appendChild(flipCardFront)
        card.appendChild(flipCardBack)
        flipCardFront.appendChild(img)
        flipCardBack.appendChild(text)
        
        //Setting the classes for each element  
        container.classList.add('option')
        card.classList.add('optionInner')
        flipCardFront.classList.add('flipFront')
        flipCardBack.classList.add('flipBack')    
        img.classList.add('image')  
        text.classList.add('text')
        // For each element, check if answer is correct
        if (answer.correct && active) {
          flipCardBack.dataset.correct = answer.correct
          text.dataset.correct = answer.correct
        }
        if (active) {
          flipCardBack.addEventListener('click', selectAnswer)
          text.addEventListener('click', selectAnswer)
          console.log('working')
        }
        
        optionButtons.appendChild(container)
      })
    }
   // --------------------------- Resetting the buttons after an aswer has been chosen ---------------------------

    function resetState() {
      clearStatusClass(document.body)
      hideDiv(nextButton)
      while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild)
      }
    }

     //------------------- Function to set next question --------------------
     function setNextQuestion() {
      resetState()
      showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    // --------------------- Selecting an answer ---------------------
    function selectAnswer(e) {
      const selectedButton = e.target
      console.log(selectedButton)
      const correct = selectedButton.dataset.correct
      console.log(correct)
      if (active){ 
        setStatusClass(document.body, correct)}
      //Array.from(optionButtons.children).forEach(button => {
      //setStatusClass(button, button.dataset.correct)
      //})
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
        showDiv(nextButton)
      } 
      else {
        if (score == 5){ 
          showDiv(startButton)
          hideDiv(questionContainer)
          showDiv(instructions)
          instructions.innerHTML = "Congratulation! You are now a clean energy expert. Click to move on to the next game."
          startButton.innerText = 'Next Game' 
          startButton.addEventListener("click", () => {
          playButtonSound() 
          window.location.href="/Ahmed's Minigames/minigameOne.html"})     
        }
        else{
          clearStatusClass(document.body)
          showDiv(instructions)
          instructions.innerHTML = "Good Job! You scored: "+score.toString()+ 
          " points, To move on to the next game you must answer all the question correct"
          showDiv(startButton)
          hideDiv(questionContainer)
          startButton.innerText = 'Restart'
          score = 0
          active = true 
        }
      }
    }

    
    function setStatusClass(element, correct) {
      clearStatusClass(element)
      if (active) { 
        if (correct) {
          score++ 
          playCorrectSound()
          counter.innerHTML = score
          element.classList.add('correct')
          //console.log('correct')
        } 
        else{
          playWrongSound()
          element.classList.add('wrong')
          //console.log('wrong')
          }
      }
      active = false
    }
      
    
    function clearStatusClass(element) {
      element.classList.remove('correct')
      element.classList.remove('wrong')
    }
    
    

