const buttonStart = document.querySelector('[data-start]')
const buttonStop = document.querySelector('[data-stop]')
buttonStart.addEventListener('click', handlerButtonStart)

let setColor

function handlerButtonStart(evt) {
    
     setColor = setInterval(()=>document.body.style.backgroundColor =getRandomHexColor(),1000 )

     buttonStart.removeEventListener('click', handlerButtonStart)
}
buttonStop.addEventListener('click', handlerButtonStop)

function handlerButtonStop() {
clearInterval(setColor)   
buttonStart.addEventListener('click', handlerButtonStart) 
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
