const searchInput = document.getElementById('search-fetch-input')
const searchBtn = document.getElementById('search-fetch-button')
const weatherTemp = document.getElementById('weather-temp')
const weatherDesc = document.getElementById('weather-Description')
const city = searchInput.value.trim()
const apiKey = bf09142fa4854344916123406242007
const temp = data.main.temp
const description = data.weather[0].description
const weatherIcon = document.querySelector('#weather-icon')
      

function fetchWeather(){
 fetch(`(https://api.weatherapi.com/v1/forecast.json?key=bf09142fa4854344916123406242007&q)`) 
  .then(response => response.json())
    .then(data => {
      if (description.includes('rain') || temp < 15) { 
        weatherIcon.src = 'img/rain.png'
      } else {
        weatherIcon.src = 'img/cloud.png'
      }

      weatherTemp.innerHTML = `${temp}°C`
      weatherDesc.innerHTML = description
    })
    .catch(error => console.error(error))
   searchInput.value = ''
}

searchBtn.addEventListener('click', fetchWeather)

