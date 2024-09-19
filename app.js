

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
        })
        .catch(error => {
            console.error('Error fatching weather data: ', error);
        });

        console.log("Done")
}

fetchWeatherData();
