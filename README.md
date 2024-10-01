# Road Trip Weather Planner

The **Road Trip Weather Planner** is a web application that allows users to plan their trips by entering city names and the number of days they will spend at each location. The app fetches weather data from the OpenWeather API for each city and displays a detailed forecast for each day of the trip, helping users to prepare for the road ahead.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Code Structure](#code-structure)
- [Limitations](#limitations)
- [Future Improvements](#future-improvements)

## Features
- **Multi-City Input:** Add multiple cities and specify how many days you plan to spend in each city.
- **Weather Forecast Display:** View detailed weather information, including temperature, humidity, wind speed, and weather conditions for each day.
- **Dynamic Content Update:** Update weather information dynamically based on user input.
- **Error Handling:** Displays a custom error message if the city is not found or if the API request fails.
- **Responsive Design:** The app is styled to be visually appealing and user-friendly.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/road-trip-weather-planner.git

2. Navigate to the project directory:
   ```bash
   cd road-trip-weather-planner

3. Install the dependencies:
   - Since this project only includes HTML and JavaScript, no npm dependencies are required. However, if additional libraries are added in the future, make sure to install them.

4. Open the index.html file in your web browser:
   ```bash 
   open index.html

## Usage
1. Open the application in your web browser.

2. Enter the name of a city in the "Enter city name" input field.

3. Enter the number of days you plan to stay in that city in the "Enter stay duration (days)" input field.

4. Click on **Add Another City** if you want to add more cities to your trip.

5. Once all cities are entered, click **Submit** to view the weather forecast for each city and day.

### Example:

   If you are planning a 2-day trip in New York, a 2-day stay in Boston, and a 1-day stay in Washington D.C., enter the cities and durations as follows:
   
   New York, 2

   Boston, 2

   Washington D.C., 1

## API Reference

   This application uses the **OpenWeather Map API** to fetch weather data. The base URL for the API is:
   
   https://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={API_KEY}
   

   Replace {city_name} with the name of the city and {API_KEY} with your OpenWeather API key. You can sign up for an API key here: {https://openweathermap.org/}
   The default implementation uses my API key, please do not abuse it. 

### Key Parameters
   q: City name (e.g., New York)
   appid: Your OpenWeather API key
