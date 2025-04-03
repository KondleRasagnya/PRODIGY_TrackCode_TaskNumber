const apiKey = '8af7604fbf43456ae3fcf5548d5e88d8'; // Your actual API key
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const locationInput = document.getElementById('locationInput');

// Function to fetch weather data
function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                errorMessage.textContent = 'City not found.';
                errorMessage.classList.remove('hidden');
                weatherInfo.classList.add('hidden');
            } else {
                // Display weather info
                errorMessage.classList.add('hidden');
                weatherInfo.classList.remove('hidden');
                cityName.textContent = data.name;
                weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
                
                // Change temperature and humidity display format
                const temp = data.main.temp;
                const hum = data.main.humidity;

                temperature.textContent = `Temperature: ${temp}°C`;
                humidity.textContent = `Humidity: ${hum}%`;

                // Modify error message to show temperature and humidity in the desired format
                if (temp >= 30) {
                    errorMessage.textContent = `${temp}°C, Humid`;
                } else {
                    errorMessage.textContent = `${temp}°C, Comfortable`;
                }

                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            }
        })
        .catch(() => {
            errorMessage.textContent = 'Could not fetch weather data. Please try again.';
            errorMessage.classList.remove('hidden');
            weatherInfo.classList.add('hidden');
        });
}

// Function to get weather based on the user's current location
function fetchWeatherByLocation(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            errorMessage.classList.add('hidden');
            weatherInfo.classList.remove('hidden');
            cityName.textContent = data.name;
            weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
            
            // Change temperature and humidity display format
            const temp = data.main.temp;
            const hum = data.main.humidity;

            temperature.textContent = `Temperature: ${temp}°C`;
            humidity.textContent = `Humidity: ${hum}%`;

            // Modify error message to show temperature and humidity in the desired format
            if (temp >= 30) {
                errorMessage.textContent = `${temp}°C, Humid`;
            } else {
                errorMessage.textContent = `${temp}°C, Comfortable`;
            }

            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(() => {
            errorMessage.textContent = '32 Degrees,humid.';
            errorMessage.classList.remove('hidden');
            weatherInfo.classList.add('hidden');
        });
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    }
});

// Event listener for "Use My Location" button
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherByLocation(latitude, longitude);
        }, () => {
            errorMessage.textContent = 'Failed to retrieve location.';
            errorMessage.classList.remove('hidden');
            weatherInfo.classList.add('hidden');
        });
    } else {
        errorMessage.textContent = 'Geolocation is not supported by this browser.';
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
});
