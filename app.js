function fetchWeatherData(location) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&appid=99086643703ce12d8c9382eaaf333d0a'

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
            console.error('Error fetching weather data: ', error);
        });

        console.log("Done")
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');

    // Clear previous weather data
    weatherContainer.innerHTML = '';

    // Create an outer container for the columns
    const columnsContainer = document.createElement('div');
    columnsContainer.style.display = 'flex'; // Make the columns sit next to each other

    // Hashmap to keep track of which day you are populating
    const daysData = {};

    // Group forecasts by day
    data.list.forEach(item => {
        // Get the date only (ignore the time part)
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!daysData[date]) {
            daysData[date] = [];
        }

        // Push weather data to that day's array
        daysData[date].push(item);
    });

    // Outer loop - iterate over each day (columns)
    Object.keys(daysData).forEach(date => {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('day-column');
        dayColumn.style.margin = '0 10px'; // Space between columns

        // Add the date as the column header
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = `Date: ${date}`;
        dayColumn.appendChild(dateHeader);

        // Add the location to the column header
        const location = data.city.name;
        const locHeader = document.createElement('h3');
        locHeader.textContent = `Location: ${location}`;
        dayColumn.appendChild(locHeader);

        // Inner loop - iterate over each weather forecast for this day
        daysData[date].forEach(item => {
            //Create each row for the individual times of day
            const weatherItem = document.createElement('div');
            weatherItem.classList.add('weather-item');
            weatherItem.style.border = '1px solid #ccc';
            weatherItem.style.padding = '10px';
            weatherItem.style.marginBottom = '10px';

            // Get the time of day from the 'dt' field
            const time = new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });

            // Access the weather info (temperature, description)
            const temp = item.main.temp;
            const description = item.weather[0].description;

            // Build the content
            weatherItem.innerHTML = `
                <strong>Time:</strong> ${time} <br>
                <strong>Temperature:</strong> ${temp}°C <br>
                <strong>Conditions:</strong> ${description} <br>
            `;

            // Append the weather item to the current day's column
            dayColumn.appendChild(weatherItem);
        });

        // Append each day's column to the columns container
        columnsContainer.appendChild(dayColumn);
    });

    // Finally, append the columns container to the weather container
    weatherContainer.appendChild(columnsContainer);
}

function addCityField() {
    // Add a new input field for the user to enter more cities
    const cityFields = document.getElementById('cityFields');
    
    // Create new input field for city name
    const newCityInput = document.createElement('input');
    newCityInput.style.margin = '10px';
    newCityInput.type = 'text';
    newCityInput.placeholder = 'Enter city name';
    newCityInput.className = 'cityField';
    cityFields.appendChild(newCityInput);

    //Create new input field for days in city
    const newDayInput = document.createElement('input');
    newDayInput.style.margin = '5px';
    newDayInput.type = 'text';
    newDayInput.placeholder = 'How many days you will be there';
    newDayInput.className = 'dayField';
    cityFields.appendChild(newDayInput);

    cityFields.appendChild(document.createElement('br'));
}

function getCityAndDayList() {
    const cityInputs = document.getElementsByClassName('cityField');
    const dayInputs = document.getElementsByClassName('dayField');
    const cities = [];
    
    // Loop through each input field and add the values
    for (let i = 0; i < cityInputs.length; i++) {
        const cityName = cityInputs[i].value.trim();
        const dayCount = parseInt(dayInputs[i].value.trim());

        // Add the city names for each day of the trip
        for (let k = 0; k < dayCount; k++) {
            cities.push(cityName);
        }

    }

    console.log(cities);

    // // Fetch weather for each city in sequence
    // let totalDays = 0; // Track how many days have been processed overall
    // for (let i = 0; i < cities.length; i++) {
    //     fetchWeatherData(cities[i], days[i], totalDays); 
    //     totalDays += days[i]; // Add to the total day count
    // }
}

fetchWeatherData("Moscow");
