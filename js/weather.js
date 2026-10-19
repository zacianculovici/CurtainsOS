function getWeatherOpenMeteo() {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
    }
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&timezone=auto`);
        const data = await response.json();
        const weatherCodeLookup = {
            "0": "Clear sky",
            "1": "Mainly clear",
            "2": "Partly cloudy",
            "3": "Overcast",
            "45": "Fog",
            "48": "Depositing rime fog",
            "51": "Light drizzle",
            "53": "Moderate drizzle",
            "55": "Dense drizzle",
            "56": "Light freezing drizzle",
            "57": "Dense freezing drizzle",
            "61": "Slight rain",
            "63": "Moderate rain",
            "65": "Heavy rain",
            "66": "Light freezing rain",
            "67": "Heavy freezing rain",
            "71": "Slight snowfall",
            "73": "Moderate snowfall",
            "75": "Heavy snowfall",
            "77": "Snow grains",
            "80": "Slight rain showers",
            "81": "Moderate rain showers",
            "82": "Violent rain showers",
            "85": "Slight snow showers",
            "86": "Heavy snow showers",
            "95": "Thunderstorm",
            "96": "Thunderstorm with slight hail",
            "97": "Heavy thunderstorm",
            "99": "Thunderstorm with heavy hail"
        };
        console.log(`Current temperature: ${data.current.temperature_2m}°C, Weather remark: ${weatherCodeLookup[data.current.weathercode] || "Unknown"}`);
        document.getElementById('weatherTemperature').textContent = data.current.temperature_2m;
        document.getElementById('weatherDescription').textContent = weatherCodeLookup[data.current.weathercode] || "Unknown";
    }, (error) => {
        console.error("Error getting location:", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getWeatherOpenMeteo();
});
