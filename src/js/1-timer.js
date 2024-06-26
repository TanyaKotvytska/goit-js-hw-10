import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', function() {
  const datetimePicker = document.getElementById('datetime-picker');
  const startButton = document.querySelector('.btn-start');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
  }

  flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose: function(selectedDates) {
      const selectedDate = selectedDates[0];

      if (!selectedDate) {
        startButton.disabled = true;
      } else if (selectedDate < new Date()) {
        
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future'
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    }
  });

  datetimePicker.addEventListener('focus', function() {
    const selectedDate = flatpickr.parseDate(datetimePicker.value, 'Y-m-d H:i');
    if (!selectedDate) {
      startButton.disabled = true;
    }
  });

  startButton.disabled = true;

  startButton.addEventListener('click', function() {
    datetimePicker.disabled = true;
    startButton.disabled = true;

    const selectedDate = new Date(datetimePicker.value);

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future'
      });
      datetimePicker.disabled = false;
      startButton.disabled = false;
      return;
    }

    let timeDiff = selectedDate.getTime() - new Date().getTime();

    const timerInterval = setInterval(function() {
      timeDiff -= 1000;
      if (timeDiff <= 0) {
        clearInterval(timerInterval);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        datetimePicker.disabled = false;
        startButton.disabled = false;
        iziToast.success({
          title: 'Countdown Finished',
          message: 'Timer has ended!'
        });
      } else {
        const time = convertMs(timeDiff);
        daysElement.textContent = addLeadingZero(time.days);
        hoursElement.textContent = addLeadingZero(time.hours);
        minutesElement.textContent = addLeadingZero(time.minutes);
        secondsElement.textContent = addLeadingZero(time.seconds);
      }
    }, 1000);
  });
});

