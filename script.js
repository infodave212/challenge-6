document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '2e0dc0ca6a4f747e187a75a389399e25'; // Replace with your actual API key
    const cityForm = document.getElementById('cityForm');
    const cityInput = document.getElementById('cityInput');
    const weatherResults = document.getElementById('weatherResults');
    const searchHistory = document.getElementById('searchHistory');
  
    cityForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const cityName = cityInput.value.trim();
  
      if (cityName !== '') {
        // Fetch current weather and forecast for the entered city
        fetchWeatherData(cityName);
      }
    });
  
    async function fetchWeatherData(cityName) {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  
      try {
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
  
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
  
        // Display current weather and forecast in the UI
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
  
        // Update search history
        updateSearchHistory(cityName);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error - display an error message to the user
      }
    }
  
    function displayCurrentWeather(data) {
      // Code to display current weather conditions in the UI
      const currentWeatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Date: ${new Date(data.dt * 1000).toLocaleDateString()}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
      weatherResults.innerHTML = currentWeatherHTML;
    }
  
    function displayForecast(data) {
      // Code to display 5-day forecast in the UI
      const forecastHTML = data.list
        .filter(item => item.dt_txt.includes('12:00:00')) // Display only one forecast per day
        .map(item => `
          <div class="forecast-item">
            <p>Date: ${new Date(item.dt * 1000).toLocaleDateString()}</p>
            <p>Temperature: ${item.main.temp} °C</p>
            <p>Humidity: ${item.main.humidity}%</p>
            <p>Wind Speed: ${item.wind.speed} m/s</p>
          </div>
        `)
        .join('');
  
      weatherResults.innerHTML += `<div id="forecast" class="forecast">${forecastHTML}</div>`;
    }
  
    function updateSearchHistory(cityName) {
      // Code to update and display search history in the UI
      const searchHistoryHTML = `
        <div class="history-item" onclick="searchHistoryClick('${cityName}')">${cityName}</div>
      `;
      searchHistory.innerHTML += searchHistoryHTML;
    }
  
    // Function to handle click on a city in the search history
    window.searchHistoryClick = function(cityName) {
      // Fetch and display weather data for the selected city
      fetchWeatherData(cityName);
    };
  });