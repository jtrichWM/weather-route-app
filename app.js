function fetchWeatherData(location) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&appid=99086643703ce12d8c9382eaaf333d0a'

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! status: ${response.status}');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data for: ", location, data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching weather data: ', error);
        });
}

function displayWeather(citiesData, citiesTotal) {
    const weatherContainer = document.getElementById('weatherContainer');

    // Clear previous weather data
    weatherContainer.innerHTML = '';

    // Create an outer container for the columns
    const columnsContainer = document.createElement('div');
    columnsContainer.style.display = 'flex'; // Make the columns sit next to each other

    // Loop through each city in the citiesTotal array (each day)
    citiesTotal.forEach((city, index) => {
        const cityWeatherData = citiesData[city];

        if (!cityWeatherData) {
            console.error(`No weather data found for city: ${city}`);
            return; // Skip to the next city if no data found
        }

        // Group forecasts by day for the current city
        const daysData = {};

        cityWeatherData.list.forEach(item => {
            // Get the date only (ignore the time part)
            const date = new Date(item.dt * 1000).toLocaleDateString();

            if (!daysData[date]) {
                daysData[date] = [];
            }

            // Push weather data to that day's array
            daysData[date].push(item);
        });

        // Get the current date for this day in the trip (based on the index)
        const currentDate = Object.keys(daysData)[index % Object.keys(daysData).length];
        const weatherForCurrentDay = daysData[currentDate];

        if (!weatherForCurrentDay) {
            console.error(`No weather data found for date: ${currentDate}`);
            return; // Skip if no data for the current day
        }

        // Create a column for this city and day
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('day-column');
        dayColumn.style.margin = '0 10px'; // Space between columns

        // Add the date as the column header
        const dateHeader = document.createElement('h3');
        dateHeader.style.color = '#2c3e50';
        dateHeader.textContent = `Date: ${currentDate}`;
        dayColumn.appendChild(dateHeader);

        // Add the city name as a header
        const locHeader = document.createElement('h3');
        locHeader.style.color = '#2c3e50';
        locHeader.textContent = `Location: ${city}`;
        dayColumn.appendChild(locHeader);

        // Loop through weather data for the current day and create rows
        weatherForCurrentDay.forEach(item => {
            const weatherItem = document.createElement('div');
            weatherItem.classList.add('weather-item');
            weatherItem.style.border = '1px solid #ccc';
            weatherItem.style.padding = '5px 15px';
            weatherItem.style.marginBottom = '10px';
            weatherItem.style.backgroundColor = '#c9c9c9';

            // Get the time of day from the 'dt' field
            const time = new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });

            // Access the weather info (temperature, description)
            const temp = ((item.main.temp - 273.15) * 9/5 + 32).toFixed(0); // Convert Kelvin to Fahrenheit and round to 2 decimal places
            const description = item.weather[0].description;
            const humidity = item.main.humidity;
            const iconCode = item.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const windSpeed = (item.wind.speed * 2.237).toFixed(0);


            // Build the content
            // weatherItem.innerHTML = `
            //     <strong>${time}</strong><br>
            //     <img src="${iconUrl}" alt="Weather Icon">
            //     <strong>${temp}°F</strong><br>
            //     <strong>Conditions:</strong> ${description} <br>
            // `;

            weatherItem.innerHTML = `
                <div style="margin-right: 10px;">
                    <strong>${time}</strong><br>
                    <h1>${temp}°F</h1>
                    <strong>Humidity: </strong>${humidity}%<br>
                    <strong>Wind: </strong>${windSpeed}mph<br>
                </div>
                <div style="text-align: center;">
                    <img src="${iconUrl}" alt="Weather Icon"><br>
                    <p>${description}</p><br>
                </div>
            `;

            // Append the weather item to the current day's column
            dayColumn.appendChild(weatherItem);
        });

        // Append the current day column to the container
        columnsContainer.appendChild(dayColumn);
    });

    // Append the columns container to the weather container
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
    newDayInput.placeholder = 'Stay duration (days)';
    newDayInput.className = 'dayField';
    cityFields.appendChild(newDayInput);

    cityFields.appendChild(document.createElement('br'));
}

async function getCityAndDayList() {
    const cityInputs = document.getElementsByClassName('cityField');
    const dayInputs = document.getElementsByClassName('dayField');
    const citiesTotal = [];
    const cities = [];
    
    // Loop through each input field and add the values
    for (let i = 0; i < cityInputs.length; i++) {
        const cityName = cityInputs[i].value.trim();
        const dayCount = parseInt(dayInputs[i].value.trim());

        // Add the city names for each day of the trip
        for (let k = 0; k < dayCount; k++) {
            citiesTotal.push(cityName);
        }
        cities.push(cityName);
    }

    console.log(cities);
    console.log(citiesTotal);

    const citiesData = {}

    for (let i = 0; i < cities.length; i++) {
        try {
            const weatherData = await fetchWeatherData(cities[i]);
            citiesData[cities[i]] = weatherData;
            console.log(`Data for ${cities[i]}:`, weatherData);
        } catch (error) {
            console.error('Error fetching data for ${cities[i]}:', error);
        }
    }

    console.log(citiesData);

    displayWeather(citiesData, citiesTotal.splice(0,6));
}
