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
//   const response = await fetch(apiurlForecast + city + `&appid=${apikey}&units=metric`);
//   const data = await response.json();

//   // Group forecast data by day
//   const days = {};
//   data.list.forEach(forecast => {
//     const date = new Date(forecast.dt_txt).toLocaleDateString();
//     if (!days[date]) {
//       days[date] = [];
//     }
//     days[date].push(forecast);
//   });

//   // Create HTML structure
//   let forecastHTML = '';
//   const dayLabels = ["Yesterday", "Today", "Tomorrow", "Tue", "Wed"]; // Define day labels
//   let i = 0;
//   for (const date in days) {
//     const dayForecasts = days[date].filter(forecast => {
//       const forecastTime = new Date(forecast.dt_txt).getHours();
//       return forecastTime === 12 || forecastTime === 0; // Filter for noon or midnight forecasts
//     });
//     if (dayForecasts.length) { // Only add if there's a forecast for noon or midnight
//       const forecast = dayForecasts[0]; // Take the first forecast for the day (noon or midnight)
//       let weatherIcon;
//       switch (forecast.weather[0].main) {
//         case "Clouds":
//           weatherIcon = "images/cloudy.png";
//           break;
//         case "Clear":
//           weatherIcon = "images/clear.png";
//           break;
//         case "Rain":
//           weatherIcon = "images/rain.png";
//           break;
//         case "Drizzle":
//           weatherIcon = "images/drizzle.png";
//           break;
//         case "Mist":
//         case "Haze":
//           weatherIcon = "images/mist.png";
//           break;
//         default:
//           weatherIcon = "images/default.png";
//       }
//       forecastHTML += `
//         <div class="forecast-column">
//           <div class="forecast-header">
//             <p>${dayLabels[i]}</p>
//             <p>${new Date(forecast.dt_txt).getDate()}/${new Date(forecast.dt_txt).getMonth() + 1}</p>
//           </div>
//           <img src="${weatherIcon}" alt="${forecast.weather[0].main}">
//           <p class="temp-high">${Math.round(forecast.main.temp_max)}°</p>
//           <p class="temp-low">${Math.round(forecast.main.temp_min)}°</p>
//           <p class="wind-speed">${forecast.wind.speed} km/h</p>
//         </div>
//       `;
//       i++; // Increment index for day labels
//     }
//   }

//   // Inject into forecast data section
//   forecastData.innerHTML = forecastHTML;
// }

// // Function to fetch air quality data
// async function fetchAirQuality(lat, lon) {
//     const response = await fetch(`${apiurlAirQuality}?lat=${lat}&lon=${lon}&appid=${apikey}`);
//     const data = await response.json();
//     aqiDetails.innerHTML = `
//         <p>Air Quality Index: ${data.list[0].main.aqi}</p>
//         <p>PM2.5: ${data.list[0].components.pm2_5} μg/m³</p>
//         <p>PM10: ${data.list[0].components.pm10} μg/m³</p>
//         <p>O3: ${data.list[0].components.o3} μg/m³</p>
//     `;
// }

// // Function to fetch UV index
// async function fetchUVIndex(lat, lon) {
//     const response = await fetch(`${apiurlUV}?lat=${lat}&lon=${lon}&appid=${apikey}`);
//     const data = await response.json();
//     uvDetails.innerHTML = `
//         <p>UV Index: ${data.value}</p>
//     `;
// }

// // Function to fetch weather alerts
// async function fetchAlerts(lat, lon) {
//     const response = await fetch(`${apiurl}alerts?lat=${lat}&lon=${lon}&appid=${apikey}`);
//     const data = await response.json();
//     if (data.alerts) {
//         const alertsHTML = data.alerts.map(alert => `
//             <p><strong>${alert.event}</strong>: ${alert.description}</p>
//         `).join('');
//         alertDetails.innerHTML = alertsHTML;
//     } else {
//         alertDetails.innerHTML = "<p>No severe weather alerts</p>";
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
  const dayLabels = ["Yesterday", "Today", "Tomorrow", "Tue", "Wed"]; // Define day labels
  let i = 0;
  for (const date in days) {
    const dayForecasts = days[date].filter(forecast => {
      const forecastTime = new Date(forecast.dt_txt).getHours();
      return forecastTime === 12 || forecastTime === 0; // Filter for noon or midnight forecasts
    });
    if (dayForecasts.length) { // Only add if there's a forecast for noon or midnight
      const forecast = dayForecasts[0]; // Take the first forecast for the day (noon or midnight)
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
      forecastHTML += `
        <div class="forecast-column">
          <div class="forecast-header">
            <p>${dayLabels[i]}</p>
            <p>${new Date(forecast.dt_txt).getDate()}/${new Date(forecast.dt_txt).getMonth() + 1}</p>
          </div>
          <img src="${weatherIcon}" alt="${forecast.weather[0].main}">
          <p class="temp-high">${Math.round(forecast.main.temp_max)}°</p>
          <p class="temp-low">${Math.round(forecast.main.temp_min)}°</p>
          <p class="wind-speed">${forecast.wind.speed} km/h</p>
        </div>
      `;
      i++; // Increment index for day labels
    }
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
