
const aboutContainer = document.getElementById('aboutContainer')
const buttons = document.getElementsByClassName("button")
const aboutSection = document.getElementById("aboutSection")
const aboutBtn = document.getElementById("aboutBtn")
const lockBtn = document.getElementById("lockBtn")
const playBtn = document.getElementById("playBtn")
const sec1 = document.getElementById('sec1')
const header = document.getElementById("header")
const closeAbout = document.getElementById("closeAbout")
const aboutText = document.getElementById("aboutText")
const lockedSection = document.getElementById("lockedSection")
const closeLocked = document.getElementById("closeLocked")
var buttonSound1 = document.getElementById('audio1')
var buttonSound2 = document.getElementById('audio2')
var wrongChoice = document.getElementById('audio3')

//https://www.epidemicsound.com/music/featured/
/** Creating the canvas, adjusted to windows height and width */

function showDiv(e){ 
  e.classList.remove("hide0");
}

function hideDiv(e){ 
  e.classList.add('hide0');
}

function playWrongSound(){ 
     wrongChoice.play()
    }

//========================= PLAY and LOCKED SECTION ==========================
function playSound1(){ 
  buttonSound1.play()
}
function playSound2(){ 
  buttonSound2.play()
}


for(var i=0, len = buttons.length; i<len; i++){ 
  buttons[i].addEventListener("click", () => playSound1());
}


//========================= ABOUT SECTION ==========================
// Manipulating the DOM if about button is pressed 
aboutBtn.addEventListener("click", ()=> {
  playSound1()
  hideDiv(sec1)
  hideDiv(header)
  showDiv(aboutSection)
  console.log("opened")
}) 

// Manipulating the DOM if the X button is pressed on the about section 
closeAbout.addEventListener("click", ()=> { 
  playSound2()
  hideDiv(aboutSection)
  showDiv(sec1)
  showDiv(header)
  console.log('closed')
})

// ================== LOCKED BUTTON PAGE ===============================



lockBtn.addEventListener("click", () => {
    hideDiv(sec1)
    hideDiv(header)
    showDiv(lockedSection)
    //const container = document.createElement('div')
    //const preview = document.createElement('div')
    //container.appendChild(preview)
    //container.setAttribute('id', 'lockedContainer')
    //preview.classList.add("previewBtn")

    })
  
closeLocked.addEventListener("click", ()=> { 
    playSound2()
    hideDiv(lockedSection)
    showDiv(sec1)
    showDiv(header)
    console.log('closed')
  })



