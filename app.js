const searchInput = document.getElementById('search-fetch-input');
const searchBtn = document.getElementById('search-fetch-button');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const WeatherHumidity = document.getElementById('humidity');
const WindSpeed = document.getElementById('wind-speed');
const apiKey = 'd5f5e05626d54e4b878161323240408';

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
       document.querySelector('footer').style.visibility = 'visible';
      
    })
    .catch(error => {
        console.error(error);
        weatherDesc.innerHTML = 'Syntax Error or Typo Seems theres no City/County that matches your search';
        weatherIcon.src = '';
        weatherTemp.innerHTML = '';
       WeatherHumidity.innerHTML = '';
       WindSpeed.innerHTML = '';
       document.querySelector('footer').style.visibility = 'hidden';
      })

  searchInput.value = '';
 }
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

searchBtn.addEventListener('click', fetchWeather);
