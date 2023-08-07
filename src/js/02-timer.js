import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input');
const startButton = document.querySelector('button');
const daysDifference = document.querySelector('span[data-days]');
const hoursDifference = document.querySelector('span[data-hours]');
const minutesDifference = document.querySelector('span[data-minutes]');
const secondsDifference = document.querySelector('span[data-seconds]');

startButton.disabled = true;

let timeUser;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeUser = selectedDates[0];

    if (selectedDates[0] <= options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    if (selectedDates[0] > options.defaultDate) {
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

startButton.addEventListener('click', handlerClick);

function handlerClick() {
  const interval = setInterval(() => {
    const currentDate = new Date();
    const { days, hours, minutes, seconds } = convertMs(timeUser - currentDate);

    daysDifference.textContent = days;
    hoursDifference.textContent = addLeadingZero(hours);
    minutesDifference.textContent = addLeadingZero(minutes);
    secondsDifference.textContent = addLeadingZero(seconds);

    if (timeUser - currentDate < 1000) clearInterval(interval);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
