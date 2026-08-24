async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a village, town, or city");
        return;
    }

    try {
        // Find the location
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            document.getElementById("weatherResult").innerHTML =
                "<p>Location not found. Try another name.</p>";
            return;
        }

        const location = locationData.results[0];

        // Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );

        const weatherData = await weatherResponse.json();

        document.getElementById("weatherResult").innerHTML = `
            <h2>📍 ${location.name}</h2>
            <p>🌡️ Temperature: ${weatherData.current.temperature_2m}°C</p>
            <p>💧 Humidity: ${weatherData.current.relative_humidity_2m}%</p>
            <p>💨 Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
            <p>☁️ Weather Code: ${weatherData.current.weather_code}</p>
        `;

    } catch (error) {
        document.getElementById("weatherResult").innerHTML =
            "<p>Something went wrong. Please try again.</p>";
        console.error(error);
    }
}