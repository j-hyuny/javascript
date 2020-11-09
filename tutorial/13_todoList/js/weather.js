const weather = document.querySelector('.weather')
const API = '7ce6df598553842f2d3b4e7d9e94c08f'

// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      console.log(json)
      const name = json.name
      const temp = json.main.temp

      weather.innerText = `${temp}℃ ${name}`
    })
}

function saveCoords(coords) {
  localStorage.setItem('coords', JSON.stringify(coords))
}

function geoSuccess(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude

  const coords = (latitude, longitude)

  saveCoords(coords)
  getWeather(latitude, longitude)
}

function geoError() {
  console.log('위치 정보를 허용하지 않았습니다')
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError) /**현재위치에 지역을 가져옴 */
}

function loadCoords() {
  // const loadedCoords = localStorage.getItem('coords')
  askCoords()
}

function init() {
  loadCoords()
}

init()
