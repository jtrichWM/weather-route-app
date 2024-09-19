

function fetchWeatherData() {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=99086643703ce12d8c9382eaaf333d0a'

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! status: ${response.status}');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fatching weather data: ', error);
        });

        console.log("Done")
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');

    // Clear previous weather data if any
    weatherContainer.innerHTML = '';

    // Loop through the weather list and display data for each forecast
    data.list.forEach(item => {
        const weatherItem = document.createElement('div');
        weatherItem.classList.add('weather-item');

        // Create a readable date
        const date = new Date(item.dt * 1000).toLocaleString();

        // Access the main weather info (temperature, description)
        const temp = item.main.temp;
        const description = item.weather[0].description;

        // Build the content
        weatherItem.innerHTML = `
            <strong>Date:</strong> ${date} <br>
            <strong>Temperature:</strong> ${temp}°C <br>
            <strong>Conditions:</strong> ${description} <br>
        `;

        // Append to the container
        weatherContainer.appendChild(weatherItem);
    });
}

function addCityField() {
    // Add a new input field for the user to enter more cities
    const cityFields = document.getElementById('cityFields');
    
    // Create new input field for city name
    const newCityInput = document.createElement('input');
    newCityInput.type = 'text';
    newCityInput.placeholder = 'Enter city name';
    newCityInput.className = 'cityField';
    cityFields.appendChild(newCityInput);

    //Create new input field for days in city
    const newDayInput = document.createElement('input');
    newDayInput.type = 'text';
    newDayInput.placeholder = 'How many days you will be there';
    newDayInput.className = 'dayField';
    cityFields.appendChild(newDayInput);

    cityFields.appendChild(document.createElement('br'));
}

function getCityList() {
    // Get all the city fields
    const cityInputs = document.getElementsByClassName('cityField');
    const cityList = [];

    // Loop through each input field and add the value to the list
    for (let input of cityInputs) {
        const cityName = input.value.trim();
        if (cityName !== "") {
            cityList.push(cityName);
        }
    }


    // Now, you can use the list in JavaScript
    console.log(cityList); // This will be an array of city names
}

function getDayList() {
    const dayInputs = document.getElementsByClassName('dayField');
    const dayList = [];
    
    for (let input of dayInputs) {
        const day = input.value.trim();
        if (day !== "") {
            dayList.push(day);
        }
    }

    console.log(dayList);
}

fetchWeatherData();
