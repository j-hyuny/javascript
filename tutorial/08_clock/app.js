const clock = document.querySelector('.clock')

function getTime() {
  const now = new Date()

  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()

  const h = `${hour}` < 10 ? `0${hour}` : `${hour}`
  const m = `${minute}` < 10 ? `0${minute}` : `${minute}`
  const s = `${second}` < 10 ? `0${second}` : `${second}`

  clock.textContent = `${h} : ${m} : ${s}`
}

getTime()

// setInterval(함수, 시간)

setInterval(function () {
  getTime()
}, 1000)
