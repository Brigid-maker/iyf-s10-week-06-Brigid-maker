const API_KEY = "26fd502bad4bbfc3c0c1e404c09b7dea";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const historyList = document.getElementById("search-history");

// Weather Elements
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// Fetch Weather
async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        displayWeather(data);
        saveToHistory(city);

    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

// Display Weather
function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Background change (bonus)
    changeBackground(data.weather[0].main);

    weatherDisplay.classList.remove("hidden");
}

// Background Logic
function changeBackground(condition) {
    const body = document.body;

    if (condition.includes("Cloud")) {
        body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
    } else if (condition.includes("Rain")) {
        body.style.background = "linear-gradient(to right, #314755, #26a0da)";
    } else if (condition.includes("Clear")) {
        body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
    } else {
        body.style.background = "#4facfe";
    }
}

// Loading + Error
function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

// Local Storage
function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(city);

    if (history.length > 5) history.pop();

    localStorage.setItem("weatherHistory", JSON.stringify(history));

    renderHistory();
}

function loadHistory() {
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    historyList.innerHTML = "";

    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;

        li.addEventListener("click", () => {
            getWeather(city);
        });

        historyList.appendChild(li);
    });
}

// Events
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (!city) return;

    getWeather(city);
    cityInput.value = "";
});

// Init
loadHistory();