// ================== CONTAINERS/SECTIONS ==================
const aboutSection = document.getElementById("aboutSection") 
const aboutContainer = document.getElementById('aboutContainer')
const lockedSection = document.getElementById("lockedSection")
const section = document.getElementById('section')
const header = document.getElementById("header")
const aboutText = document.getElementById("aboutText")
const settingsSection = document.getElementById("settingsSection")

// ================== BUTTONS ================== 
const buttons = document.getElementsByClassName("button")
const aboutBtn = document.getElementById("aboutBtn")
const lockBtn = document.getElementById("lockBtn")
const playBtn = document.getElementById("playBtn")
const closeAbout = document.getElementById("closeAbout")
const closeLocked = document.getElementById("closeLocked")
const settingsBtn = document.getElementById("settingsBtn") 
const closeSettings = document.getElementById("closeSettings") 
var volume = document.getElementById("volumeControl")

// ================== AUDIO ================== 
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

function start(){ 
  lockBtn.innerHTML = 'Locked'
  checkComplete()
  console.log(GAMEOVER)
}

for(var i=0, len = buttons.length; i<len; i++){ 
  buttons[i].addEventListener("click", () => playSound1());
}


//========================= ABOUT SECTION ==========================
// Manipulating the DOM if about button is pressed 
aboutBtn.addEventListener("click", () => {
  playSound1()
  hideDiv(section)
  hideDiv(header)
  showDiv(aboutSection)
  console.log("opened")
}) 

// Manipulating the DOM if the X button is pressed on the about section 
closeAbout.addEventListener("click", () => { 
  playSound2()
  hideDiv(aboutSection)
  showDiv(section)
  showDiv(header)
  console.log('closed')
})

// ================== LOCKED BUTTON PAGE ===============================
closeLocked.addEventListener("click", () => { 
  playSound2()
  hideDiv(lockedSection)
  showDiv(section)
  showDiv(header)
  console.log('closed')
})

function checkComplete() { 
  if (GAMEOVER == true) { 
    lockBtn.innerHTML = 'Unlocked'
    lockBtn.addEventListener("click", () => {
    hideDiv(section)
    hideDiv(header)
    showDiv(lockedSection)
      })
    }
  else { 
    lockBtn.innerHTML = 'Locked'

  }
}

//========================= Settings ========================= 
settingsBtn.addEventListener("click", () => {
  playSound1() 
  hideDiv(section)
  hideDiv(header)
  showDiv(settingsSection)
  console.log('opened')
})

closeSettings.addEventListener("click", () => { 
  playSound2()
  hideDiv(settingsSection)
  showDiv(section)
  showDiv(header)
  console.log('closed')
})


volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 100;
})



