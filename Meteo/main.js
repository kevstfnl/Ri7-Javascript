const user = document.getElementById('user');
const time = document.getElementById('time')
const searchButton = document.getElementById('searchButton');
const loader = document.getElementById('loader');

const result = document.getElementById('result');
const city = document.getElementById('city');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const icon = document.getElementById("icon");


// INTERDIT
const api = "https://api.openweathermap.org/data/2.5/weather?";
const key = "&appid=03c3e8281f53d31444abbcd6c8b3129d";
const golbalOptions = "&lang=fr&units=metric"
// BERK


let timeTest = performance.now()
let hasGeolocalized = false;
let lat = 0;
let long = 0;
navigator.geolocation.getCurrentPosition((pos) => {
    lat = pos.coords.latitude;
    long = pos.coords.longitude;
    hasGeolocalized = true;
    console.log("Time to geoloc: " + (performance.now() - timeTest) + "ms");
}, undefined, {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: Infinity //Cache
})

const localize = document.getElementById("localize");
localize.addEventListener('click', () => {
    if (hasGeolocalized) {
        loader.classList.remove("hidden");
        getWeather(`lat=${lat}&lon=${long}`);
    }
});

searchButton.addEventListener("click", () => search())
user.addEventListener("keydown", (e) => {
    if (e.key == "Enter") search();
});

function search() {
    loader.classList.remove("hidden");
    const value = user.value.toLowerCase();
    if (value == "") return;
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
        loader.classList.add("hidden");

    }
}

function updateDom(json) {
    loader.classList.add("hidden");
    result.classList.remove("hidden");
    city.textContent = "Actuellement à " + json.name;
    weather.textContent = "Temps: " + json.weather[0].description;
    temp.textContent = "Température: " + json.main.temp + "°C";
    wind.textContent = "Vent: " + json.wind.speed + "m/s";
    icon.src = " https://openweathermap.org/img/wn/" + json.weather[0].icon + "@2x.png"
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








let tableau = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]



for (let i = 0; i < tableau.length; i++) {

    for (let j = 0; j < array.length; j++) {


    }
}