// app.js
let locations = [];
let locationCount = 0;

document.getElementById('add-location').addEventListener('click', function() {
    const container = document.getElementById('location-container');
    
    // Create a row for each location input
    const locationRow = document.createElement('div');
    locationRow.className = 'location-row';
    locationRow.innerHTML = `
        <input type="text" placeholder="Location" id="location-${locationCount}">
        <input type="number" placeholder="Days" id="days-${locationCount}">
    `;
    
    container.appendChild(locationRow);
    locationCount++;
});

document.getElementById('fetch-weather').addEventListener('click', function() {
    const weatherResults = document.getElementById('weather-results');
    weatherResults.innerHTML = ''; // Clear previous results

    // Collect all location inputs
    locations = [];
    for (let i = 0; i < locationCount; i++) {
        const location = document.getElementById(`location-${i}`).value;
        const days = document.getElementById(`days-${i}`).value;
        if (location && days) {
            locations.push({ location, days: parseInt(days) });
        }
    }

    // Fetch weather for each location
    locations.forEach(location => {
        fetchWeatherData(location.location, location.days);
    });
});

function fetchWeatherData(location, days) {
    const apiKey = 'deaa3c8ef496b3c3d37c87502444ad27';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Get weather forecast for the number of days specified
            displayWeather(data, location, days);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });
}

function displayWeather(data, location, days) {
    const weatherResults = document.getElementById('weather-results');

    // Create a container for this location's weather
    const weatherContainer = document.createElement('div');
    weatherContainer.innerHTML = `<h3>Weather in ${location}</h3>`;

    // Display weather for the number of days requested
    for (let i = 0; i < days && i < data.list.length; i++) {
        const weather = data.list[i];
        const date = new Date(weather.dt * 1000).toLocaleDateString();
        const temp = weather.main.temp;
        const conditions = weather.weather[0].description;

        const weatherInfo = document.createElement('p');
        weatherInfo.textContent = `${date}: ${temp}°C, ${conditions}`;
        weatherContainer.appendChild(weatherInfo);
    }

    weatherResults.appendChild(weatherContainer);
}
