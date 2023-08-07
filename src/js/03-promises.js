import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('input', handlerInput);
let firstDelay = 0;
let step = 0;
let maxPromise = 0;

function handlerInput(evt) {
  const event = evt.target;
  if (event.name === 'delay') {
  firstDelay = Number(event.value);
  } else if (event.name === 'step') {
    step = Number(event.value);
  } else {
    maxPromise = Number(event.value);
  }
}
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault()

  let position = 0;
  let delay = firstDelay

for (let i = 0; i < maxPromise; i+=1) {
  
  position += 1;
    
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });

    delay+=step
 
}
 
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{

      const shouldResolve = Math.random() > 0.3;
      
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }},delay)
    
  });
}








