const timerView = document.getElementById('timer')
const timeInput = document.getElementById('time-input')
const startButton = document.getElementById('start-button')
const resetButton = document.getElementById('reset-button')
const stopButton = document.getElementById('stop-button')
const toastContainer = document.getElementById('toast')

const setTimerToLocalStorage = (time) => {
  localStorage.setItem('timer', time)
}

const getTimerFromLocalStorage = () => {
  return +(localStorage.getItem('timer') || 0)
}

const toast = (message) => {
  toastContainer.textContent = message
  toastContainer.classList.add('toast-visible')

  setTimeout(() => {
    toastContainer.classList.remove('toast-visible')
  }, 4000)
}

let timeInSeconds = getTimerFromLocalStorage()

let timer = null

const renderTime = (time) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = (time % 3600) % 60

  timerView.textContent = `${hours} hours ${minutes} min ${seconds} sec`
}

const timeFunc = () => {
  timeInSeconds = timeInSeconds - 1
  setTimerToLocalStorage(timeInSeconds)
  renderTime(timeInSeconds)
}

const startTimer = () => {
  if (timer) {
    toast('Timer already has been started')

    return
  }

  if (!timer && !timeInSeconds && !timeInput?.value) {
    toast('Enter valid value')

    return
  }

  if (timeInput?.value) {
    timeInSeconds = timeInput.value * 60 * 60
  }

  timer = setInterval(timeFunc, 1000)

  timeInput.value = null
}

const stopTimer = () => {
  clearInterval(timer)
  timer = null
}

const resetTimer = () => {
  stopTimer()

  timeInSeconds = 0
  setTimerToLocalStorage(0)
  renderTime(0)
}

startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
resetButton.addEventListener('click', resetTimer)

renderTime(timeInSeconds)
