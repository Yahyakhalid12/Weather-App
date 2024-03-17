document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", function () {
        searchWeather();
    });

    document.getElementById("cityInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchWeather();
        }
    });
});

function searchWeather() {
    var city = document.getElementById("cityInput").value.trim();
    if (city !== "") {
        var apiKey = "fea49ac0b08421bd34f8e372c731fe9b"; // Replace with your OpenWeather API key
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                displayWeather(data);
            } else {
                alert("Error: City not found!");
            }
        };
        xhr.send();
    } else {
        alert("Please enter a city name!");
    }
}

function displayWeather(data) {
    var weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = "";

    var date = new Date(data.dt * 1000);

    var day = date.toLocaleDateString('en-US', { weekday: 'short' });
    var formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    var temperature = (data.main.temp - 273.15).toFixed(1);
    var feelsLike = (data.main.feels_like - 273.15).toFixed(1);
    var tempMin = (data.main.temp_min - 273.15).toFixed(1);
    var tempMax = (data.main.temp_max - 273.15).toFixed(1);
    var pressure = data.main.pressure;
    var humidity = data.main.humidity;
    var visibility = data.visibility;
    var description = data.weather[0].description;
    var weatherMain = data.weather[0].main;

    var imagePath = "images/";
    switch (weatherMain) {
        case "Clear":
            imagePath += "clear.png";
            break;
        case "Clouds":
            if (description.toLowerCase().includes("broken clouds")) {
                imagePath += "clouds.png";
            } else if (description.toLowerCase().includes("overcast")) {
                imagePath += "overcast.png";
            } else {
                imagePath += "clouds.png";
            }
            break;
        case "Drizzle":
            imagePath += "drizzle.png";
            break;
        case "Mist":
            imagePath += "mist.png";
            break;
        case "Rain":
            imagePath += "rain.png";
            break;
        case "Snow":
            imagePath += "snow.png";
            break;
        default:
            imagePath += "defeault.png";
            break;
    }

    weatherInfo.innerHTML = `
        <div class="forecast">
            <p><strong>${day}, ${formattedDate}</strong></p>
            <p>Temperature: ${temperature}°C</p>
            <p>Feels Like: ${feelsLike}°C</p>
            <p>Min Temperature: ${tempMin}°C</p>
            <p>Max Temperature: ${tempMax}°C</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Humidity: ${humidity}%</p>
            <p>Visibility: ${visibility} meters</p>
            <p>Description: ${description}</p>
            <img src="${imagePath}" alt="${weatherMain}" class="weather-icon">
        </div>
    `;
}