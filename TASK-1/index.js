const weatherForm = document.querySelector(".weather-form");
const cityName = document.querySelector(".city-name");
const card = document.querySelector(".card")
const API_KEY = "3fd07cd807d49002a733959bb408ce77";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityName.value;
    if (city) {
        try {
            const weatherData = await getData(city);
            weatherInfo(weatherData);
        } 
        catch (error) {
            console.error(error);
            showError(error);
        }
    }
    else {
        showError("city name not valid");
    }
});

async function getData(city) {
    const API_URL =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await fetch(API_URL);
    console.log(response);

    if (!response.ok) {
        throw new Error("could not get weather");
    }
    return await response.json();
}

function weatherInfo(data) {
    const {
        name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(1)} \u00B0C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
            return "⛅";
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "???";
    }
}

function showError(msg) {
    const errDisplay = document.createElement("p");
    errDisplay.textContent = msg;
    errDisplay.classList.add("errDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errDisplay);
}