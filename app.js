// const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const apikey = "9d3ea3773d5ebff460c5c52453ed9d29";
// const apiurlForecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
// const apiurlAirQuality = "http://api.openweathermap.org/data/2.5/air_pollution";
// const apiurlUV = "https://api.openweathermap.org/data/2.5/uvi";

// // DOM elements
// const cityInput = document.getElementById("city-input");
// const fetchWeatherBtn = document.getElementById("fetch-weather-btn");
// const weatherDetails = document.getElementById("weather-details");
// const forecastData = document.getElementById("forecast-data");
// const aqiDetails = document.getElementById("aqi-details");
// const uvDetails = document.getElementById("uv-details");
// const alertDetails = document.getElementById("alert-details");
// const weathericon = document.getElementById("weather-icon");

// // Event listener for fetching weather by city name
// fetchWeatherBtn.addEventListener("click", async () => {
//     const city = cityInput.value;
//     if (city) {
//         const response = await fetch(apiurl + city + `&appid=${apikey}`);
//         if (response.status === 404) {
//             alert("City not found");
//             cityInput.value = "";
//         } else {
//             const data = await response.json();
//             displayCurrentWeather(data);
//             fetchForecast(city);
//             fetchAirQuality(data.coord.lat, data.coord.lon);
//             fetchUVIndex(data.coord.lat, data.coord.lon);
//             fetchAlerts(data.coord.lat, data.coord.lon);
//         }
//     } else {
//         alert("Please enter a city name");
//     }
// });

// function displayCurrentWeather(data) {
//     let weatherIcon;

//     switch (data.weather[0].main) {
//         case "Clouds":
//             weatherIcon = "images/clouds.png";
//             break;
//         case "Clear":
//             weatherIcon = "images/clear.png";
//             break;
//         case "Rain":
//             weatherIcon = "images/rain.png";
//             break;
//         case "Drizzle":
//             weatherIcon = "images/drizzle.png";
//             break;
//         case "Mist":
//         case "Haze":
//             weatherIcon = "images/mist.png";
//             break;
//         default:
//             weatherIcon = "images/default.png"; // Fallback for any other weather conditions
//     }

//     // Populate the weather details with the data and the corresponding icon
//     weatherDetails.innerHTML = `
//         <img src="${weatherIcon}" alt="${data.weather[0].main}">
//         <p>City: ${data.name}</p>
//         <p>Temperature: ${Math.round(data.main.temp)}°C</p>
//         <p>Humidity: ${data.main.humidity}%</p>
//         <p>Wind Speed: ${data.wind.speed} km/h</p>
//         <p>Weather: ${data.weather[0].main}</p>
//     `;
// }

// // Function to fetch and display 5-day weather forecast
// async function fetchForecast(city) {
//     const response = await fetch(apiurlForecast + city + `&appid=${apikey}&units=metric`);
//     const data = await response.json();

//     const forecastHTML = data.list.map(forecast => {
//         const date = new Date(forecast.dt_txt);

//         // Determine which weather icon to use based on the weather condition
//         let weatherIcon;
//         switch (forecast.weather[0].main) {
//             case "Clouds":
//                 weatherIcon = "images/cloudy.png";
//                 break;
//             case "Clear":
//                 weatherIcon = "images/clear.png";
//                 break;
//             case "Rain":
//                 weatherIcon = "images/rain.png";
//                 break;
//             case "Drizzle":
//                 weatherIcon = "images/drizzle.png";
//                 break;
//             case "Mist":
//             case "Haze":
//                 weatherIcon = "images/mist.png";
//                 break;
//             default:
//                 weatherIcon = "images/default.png"; // Fallback for any other weather conditions
//         }

//         return `
//             <div class="forecast-item">
//                 <p>${date.toDateString()} ${date.toLocaleTimeString()}</p>
//                 <img src="${weatherIcon}" alt="${forecast.weather[0].main}">
//                 <p>Temperature: ${Math.round(forecast.main.temp)}°C</p>
//                 <p>Weather: ${forecast.weather[0].main}</p>
//             </div>
//         `;
//     }).join('');

//     forecastData.innerHTML = `<div class="forecast-container">${forecastHTML}</div>`;
// }

// // Function to fetch and display Air Quality Index (AQI)
// async function fetchAirQuality(lat, lon) {
//     const response = await fetch(`${apiurlAirQuality}?lat=${lat}&lon=${lon}&appid=${apikey}`);
//     const data = await response.json();
    
//     const aqi = data.list[0].main.aqi;
//     aqiDetails.innerHTML = `
//         <p>Air Quality Index: ${aqi} (1: Good, 5: Very Poor)</p>
//     `;
// }

// // Function to fetch and display UV Index
// async function fetchUVIndex(lat, lon) {
//     const response = await fetch(`${apiurlUV}?lat=${lat}&lon=${lon}&appid=${apikey}`);
//     const data = await response.json();
    
//     uvDetails.innerHTML = `
//         <p>UV Index: ${data.value}</p>
//     `;
// }

// // Function to fetch and display weather alerts
// async function fetchAlerts(lat, lon) {
//     // This will use the One Call API (which includes alerts)
//     const apiurlOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
//     const response = await fetch(apiurlOneCall);
//     const data = await response.json();

//     if (data.alerts && data.alerts.length > 0) {
//         const alertsHTML = data.alerts.map(alert => `
//             <div class="alert-item">
//                 <p><strong>${alert.event}</strong></p>
//                 <p>${alert.description}</p>
//             </div>
//         `).join('');
//         alertDetails.innerHTML = alertsHTML;
//     } else {
//         alertDetails.innerHTML = "<p>No weather alerts</p>";
//     }
// }

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

function displayCurrentWeather(data) {
    let weatherIcon;

    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon = "images/clear.png";
            break;
        case "Rain":
            weatherIcon = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon = "images/drizzle.png";
            break;
        case "Mist":
        case "Haze":
            weatherIcon = "images/mist.png";
            break;
        default:
            weatherIcon = "images/default.png"; // Fallback for any other weather conditions
    }

    // Populate the weather details with the data and the corresponding icon
    weatherDetails.innerHTML = `
        <img src="${weatherIcon}" alt="${data.weather[0].main}">
        <p>City: ${data.name}</p>
        <p>Temperature: ${Math.round(data.main.temp)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} km/h</p>
        <p>Weather: ${data.weather[0].main}</p>
    `;
}

// Function to fetch and display 5-day weather forecast
async function fetchForecast(city) {
    const response = await fetch(apiurlForecast + city + `&appid=${apikey}&units=metric`);
    const data = await response.json();

    // Group forecast data by day
    const days = {};

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        if (!days[date]) {
            days[date] = [];
        }
        days[date].push(forecast);
    });

    // Create HTML structure
    let forecastHTML = '';
    for (const date in days) {
        const dayForecasts = days[date].map(forecast => {
            const time = new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let weatherIcon;
            switch (forecast.weather[0].main) {
                case "Clouds":
                    weatherIcon = "images/cloudy.png";
                    break;
                case "Clear":
                    weatherIcon = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon = "images/drizzle.png";
                    break;
                case "Mist":
                case "Haze":
                    weatherIcon = "images/mist.png";
                    break;
                default:
                    weatherIcon = "images/default.png";
            }
            return `
                <div class="forecast-item">
                    <p>${time}</p>
                    <img src="${weatherIcon}" alt="${forecast.weather[0].main}">
                    <p>${Math.round(forecast.main.temp)}°C</p>
                </div>
            `;
        }).join('');
        forecastHTML += `
            <div class="forecast-row">
                <p>${date}</p>
                ${dayForecasts}
            </div>
        `;
    }

    // Inject into forecast data section
    forecastData.innerHTML = forecastHTML;
}

// Function to fetch air quality data
async function fetchAirQuality(lat, lon) {
    const response = await fetch(`${apiurlAirQuality}?lat=${lat}&lon=${lon}&appid=${apikey}`);
    const data = await response.json();
    aqiDetails.innerHTML = `
        <p>Air Quality Index: ${data.list[0].main.aqi}</p>
        <p>PM2.5: ${data.list[0].components.pm2_5} μg/m³</p>
        <p>PM10: ${data.list[0].components.pm10} μg/m³</p>
        <p>O3: ${data.list[0].components.o3} μg/m³</p>
    `;
}

// Function to fetch UV index
async function fetchUVIndex(lat, lon) {
    const response = await fetch(`${apiurlUV}?lat=${lat}&lon=${lon}&appid=${apikey}`);
    const data = await response.json();
    uvDetails.innerHTML = `
        <p>UV Index: ${data.value}</p>
    `;
}

// Function to fetch weather alerts
async function fetchAlerts(lat, lon) {
    const response = await fetch(`${apiurl}alerts?lat=${lat}&lon=${lon}&appid=${apikey}`);
    const data = await response.json();
    if (data.alerts) {
        const alertsHTML = data.alerts.map(alert => `
            <p><strong>${alert.event}</strong>: ${alert.description}</p>
        `).join('');
        alertDetails.innerHTML = alertsHTML;
    } else {
        alertDetails.innerHTML = "<p>No severe weather alerts</p>";
    }
}
