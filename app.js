// const API_KEY = 'ed821de5720719bdcec0acd34d196aba';

// // Function to fetch and display current weather
// function fetchCurrentWeather(city) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             displayCurrentWeather(data);
//             fetchUVIndex(data.coord.lat, data.coord.lon);
//             fetchWeatherAlerts(data.coord.lat, data.coord.lon);
//         })
//         .catch(error => console.error('Error fetching current weather data:', error));
// }

// function displayCurrentWeather(data) {
//     const weatherDetails = document.getElementById('weather-details');
//     weatherDetails.innerHTML = `
//         <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
//         <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
//         <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
//     `;
// }

// // Function to fetch and display 5-day weather forecast
// function fetchWeatherForecast(city) {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displayWeatherForecast(data))
//         .catch(error => console.error('Error fetching weather forecast:', error));
// }

// function displayWeatherForecast(data) {
//     const forecastData = document.getElementById('forecast-data');
//     const forecasts = data.list.filter((_, index) => index % 8 === 0); // Select data every 24 hours
//     forecastData.innerHTML = forecasts.map(item => `
//         <p><strong>Date:</strong> ${item.dt_txt.split(' ')[0]} - 
//         <strong>Temp:</strong> ${item.main.temp}°C - 
//         <strong>Condition:</strong> ${item.weather[0].description}</p>
//     `).join('');
// }

// // Function to fetch and display Air Quality Index (AQI)
// function fetchAirQualityIndex(city) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const { coord } = data;
//             return fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`);
//         })
//         .then(response => response.json())
//         .then(data => displayAirQualityIndex(data))
//         .catch(error => console.error('Error fetching AQI data:', error));
// }

// function displayAirQualityIndex(data) {
//     const aqiDetails = document.getElementById('aqi-details');
//     const aqi = data.list[0].main.aqi;
//     const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
//     aqiDetails.innerHTML = `<p><strong>AQI Level:</strong> ${aqi} (${aqiLevels[aqi - 1]})</p>`;
// }

// // Function to fetch and display UV Index
// function fetchUVIndex(lat, lon) {
//     const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${API_KEY}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displayUVIndex(data))
//         .catch(error => console.error('Error fetching UV index data:', error));
// }

// function displayUVIndex(data) {
//     const uvDetails = document.getElementById('uv-details');
//     const uvIndex = data.current.uvi;
//     uvDetails.innerHTML = `<p><strong>UV Index:</strong> ${uvIndex}</p>`;
// }

// // Function to fetch and display weather alerts
// function fetchWeatherAlerts(lat, lon) {
//     const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displayWeatherAlerts(data))
//         .catch(error => console.error('Error fetching weather alerts:', error));
// }

// function displayWeatherAlerts(data) {
//     const alertDetails = document.getElementById('alert-details');
//     if (data.alerts) {
//         alertDetails.innerHTML = data.alerts.map(alert => `
//             <p><strong>Alert:</strong> ${alert.event} - 
//             <strong>Description:</strong> ${alert.description}</p>
//         `).join('');
//     } else {
//         alertDetails.innerHTML = '<p>No severe weather alerts at the moment.</p>';
//     }
// }

// // Fetch weather data on button click
// document.getElementById('fetch-weather-btn').addEventListener('click', () => {
//     const city = document.getElementById('city-input').value;
//     if (city) {
//         fetchCurrentWeather(city);
//         fetchWeatherForecast(city);
//         fetchAirQualityIndex(city);

//     } else {
//         alert('Please enter a city name.');
//     }
// });

// API configuration
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "9d3ea3773d5ebff460c5c52453ed9d29";
const apiurlForecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const apiurlAirQuality = "http://api.openweathermap.org/data/2.5/air_pollution";
const apiurlUV = "https://api.openweathermap.org/data/2.5/uvi";

// DOM elements
const cityInput = document.getElementById("city-input");
const fetchWeatherBtn = document.getElementById("fetch-weather-btn");
const weatherDetails = document.getElementById("weather-details");
const forecastData = document.getElementById("forecast-data");
const aqiDetails = document.getElementById("aqi-details");
const uvDetails = document.getElementById("uv-details");
const alertDetails = document.getElementById("alert-details");

// Event listener for fetching weather by city name
fetchWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value;
    if (city) {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (response.status === 404) {
            alert("City not found");
            cityInput.value = "";
        } else {
            const data = await response.json();
            displayCurrentWeather(data);
            fetchForecast(city);
            fetchAirQuality(data.coord.lat, data.coord.lon);
            fetchUVIndex(data.coord.lat, data.coord.lon);
            fetchAlerts(data.coord.lat, data.coord.lon);
        }
    } else {
        alert("Please enter a city name");
    }
});

// Function to display current weather data
function displayCurrentWeather(data) {
    weatherDetails.innerHTML = `
        <p>City: ${data.name}</p>
        <p>Temperature: ${Math.round(data.main.temp)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} km/h</p>
        <p>Weather: ${data.weather[0].main}</p>
    `;
}

// Function to fetch and display 5-day weather forecast
async function fetchForecast(city) {
    const response = await fetch(apiurlForecast + city + `&appid=${apikey}`);
    const data = await response.json();

    const forecastHTML = data.list.map(forecast => {
        const date = new Date(forecast.dt_txt);
        return `
            <div class="forecast-item">
                <p>${date.toDateString()} ${date.toLocaleTimeString()}</p>
                <p>Temperature: ${Math.round(forecast.main.temp)}°C</p>
                <p>Weather: ${forecast.weather[0].main}</p>
            </div>
        `;
    }).join('');

    forecastData.innerHTML = forecastHTML;
}

// Function to fetch and display Air Quality Index (AQI)
async function fetchAirQuality(lat, lon) {
    const response = await fetch(`${apiurlAirQuality}?lat=${lat}&lon=${lon}&appid=${apikey}`);
    const data = await response.json();
    
    const aqi = data.list[0].main.aqi;
    aqiDetails.innerHTML = `
        <p>Air Quality Index: ${aqi} (1: Good, 5: Very Poor)</p>
    `;
}

// Function to fetch and display UV Index
async function fetchUVIndex(lat, lon) {
    const response = await fetch(`${apiurlUV}?lat=${lat}&lon=${lon}&appid=${apikey}`);
    const data = await response.json();
    
    uvDetails.innerHTML = `
        <p>UV Index: ${data.value}</p>
    `;
}

// Function to fetch and display weather alerts
async function fetchAlerts(lat, lon) {
    // This will use the One Call API (which includes alerts)
    const apiurlOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    const response = await fetch(apiurlOneCall);
    const data = await response.json();

    if (data.alerts && data.alerts.length > 0) {
        const alertsHTML = data.alerts.map(alert => `
            <div class="alert-item">
                <p><strong>${alert.event}</strong></p>
                <p>${alert.description}</p>
            </div>
        `).join('');
        alertDetails.innerHTML = alertsHTML;
    } else {
        alertDetails.innerHTML = "<p>No weather alerts</p>";
    }
}
