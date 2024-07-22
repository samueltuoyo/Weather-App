const searchInput = document.getElementById('search-fetch-input');
const searchBtn = document.getElementById('search-fetch-button');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const WeatherHumidity = document.getElementById('humidity');
const WindSpeed = document.getElementById('wind-speed');
const apiKey = 'bf09142fa4854344916123406242007';

function fetchWeather() {
  const city = searchInput.value.trim();
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temp = data.current.temp_c;
      const description = data.current.condition.text;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_mph;

      if (description.includes('rain') || temp < 15) {
        weatherIcon.src = 'img/storm.png';
      } 
      
      else if(description.includes('rain') || temp >= 15){
          weatherIcon.src = 'img/sunny.png';
      }
      
      else {
        weatherIcon.src = 'img/cloud.png';
      }

      weatherTemp.innerHTML = `${temp}°C`;
      weatherDesc.innerHTML = description;
      WeatherHumidity.innerHTML = humidity + '%';
      WindSpeed.innerHTML = windSpeed + 'Km/H';
      
    })
    .catch(error => console.error(error));

  searchInput.value = '';
}

searchBtn.addEventListener('click', fetchWeather);
