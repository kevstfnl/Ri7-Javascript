// Get lat and long https://openweathermap.org/api/geocoding-api
// Get weather current https://openweathermap.org/current  https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const user = document.getElementById('user');
const time = document.getElementById('time')
const searchButton = document.getElementById('searchButton');

const result = document.getElementById('result');
const city = document.getElementById('city');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');

// INTERDIT
const api = "https://api.openweathermap.org/data/2.5/weather?";
const key = "&appid=03c3e8281f53d31444abbcd6c8b3129d";
const golbalOptions = "&lang=fr&units=metric"
// BERK

const localize = document.getElementById("localize");
localize.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        getWeather(`lat=${lat}&lon=${long}`);
    })
});
searchButton.addEventListener("click", () => search())
user.addEventListener("keydown", (e) => {
    if (e.key == "Enter") search();
});

function search() {
    const value = user.value;
    if (value == "") return;
    console.log(value);
    user.value = "";
    getWeather(`q=${value},fr`);
}

async function getWeather(options) {
    try {
        const resp = await fetch(api + options + golbalOptions + key);
        if (!resp.ok) throw new Error("Impossible de contacter l'api de meteo: " + resp.status);
        const jsonResp = await resp.json();
        updateDom(jsonResp);
    } catch (err) {
        console.error(err);
    }
}

function updateDom(json) {
    result.classList.remove("hidden");
    city.textContent = "Actuellement à " + json.name;
    weather.textContent = "Temps: " + json.weather[0].description;
    temp.textContent = "Température: " + json.main.temp + "°C";
    wind.textContent = "Vent: ";
}

function updateDate() {
    const date = new Date();

    const jour = String(date.getDate()).padStart(2, '0');
    const mois = String(date.getMonth() + 1).padStart(2, '0');
    const annee = date.getFullYear();

    const heures = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const secondes = String(date.getSeconds()).padStart(2, '0');

    time.innerText = `${jour}/${mois}/${annee} - ${heures}:${minutes}:${secondes}`;
    setTimeout(() => {
        updateDate();
    }, 1000);
}
updateDate();