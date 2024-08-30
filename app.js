const API_KEY = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.

// Function to fetch and display current weather
function fetchCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            fetchUVIndex(data.coord.lat, data.coord.lon);
            fetchWeatherAlerts(data.coord.lat, data.coord.lon);
        })
        .catch(error => console.error('Error fetching current weather data:', error));
}

function displayCurrentWeather(data) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
    `;
}

// Function to fetch and display 5-day weather forecast
function fetchWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherForecast(data))
        .catch(error => console.error('Error fetching weather forecast:', error));
}

function displayWeatherForecast(data) {
    const forecastData = document.getElementById('forecast-data');
    const forecasts = data.list.filter((_, index) => index % 8 === 0); // Select data every 24 hours
    forecastData.innerHTML = forecasts.map(item => `
        <p><strong>Date:</strong> ${item.dt_txt.split(' ')[0]} - 
        <strong>Temp:</strong> ${item.main.temp}°C - 
        <strong>Condition:</strong> ${item.weather[0].description}</p>
    `).join('');
}

// Function to fetch and display Air Quality Index (AQI)
function fetchAirQualityIndex(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { coord } = data;
            return fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`);
        })
        .then(response => response.json())
        .then(data => displayAirQualityIndex(data))
        .catch(error => console.error('Error fetching AQI data:', error));
}

function displayAirQualityIndex(data) {
    const aqiDetails = document.getElementById('aqi-details');
    const aqi = data.list[0].main.aqi;
    const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    aqiDetails.innerHTML = `<p><strong>AQI Level:</strong> ${aqi} (${aqiLevels[aqi - 1]})</p>`;
}

// Function to fetch and display UV Index
function fetchUVIndex(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayUVIndex(data))
        .catch(error => console.error('Error fetching UV index data:', error));
}

function displayUVIndex(data) {
    const uvDetails = document.getElementById('uv-details');
    const uvIndex = data.current.uvi;
    uvDetails.innerHTML = `<p><strong>UV Index:</strong> ${uvIndex}</p>`;
}

// Function to fetch and display weather alerts
function fetchWeatherAlerts(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherAlerts(data))
        .catch(error => console.error('Error fetching weather alerts:', error));
}

function displayWeatherAlerts(data) {
    const alertDetails = document.getElementById('alert-details');
    if (data.alerts) {
        alertDetails.innerHTML = data.alerts.map(alert => `
            <p><strong>Alert:</strong> ${alert.event} - 
            <strong>Description:</strong> ${alert.description}</p>
        `).join('');
    } else {
        alertDetails.innerHTML = '<p>No severe weather alerts at the moment.</p>';
    }
}

// Fetch weather data on button click
document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchCurrentWeather(city);
        fetchWeatherForecast(city);
        fetchAirQualityIndex(city);
    } else {
        alert('Please enter a city name.');
    }
});
