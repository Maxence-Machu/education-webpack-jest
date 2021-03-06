import './style/main.scss';
import yes from './assets/images/yes.jpg'

document.addEventListener('DOMContentLoaded', async function(event) {
    
    let temps = await callAPI();

    let code_temps = temps.forecast.weather
    console.info('Le code temps renvoyé par l\'API est : ', code_temps);

    let weather_string = getWeatherStringFromCode(code_temps);
    let weather_text = getWeatherTextFromString(weather_string);

    renderHTML(weather_string, weather_text);
})

/*
Fonction qui appelle l'API meteo-concept
*/
async function callAPI(){
    let temps_demain = await fetch(`https://api.meteo-concept.com/api/forecast/daily/1?token=${process.env.WEATHER_API_KEY}&insee=76540`);
    console.log(temps_demain)
    return await temps_demain.json();
}

/*
Retourne la variable qui va nous servir pour le CSS
https://api.meteo-concept.com/documentation#code-temps
[1] TODO: Compléter avec les différents code temps 
[1] TODO: Attention, ne faites pas un switch "géant" 
*/
function getWeatherStringFromCode(weather_code){
    switch(weather_code){
        case 0:
            return 'SUNNY'
        case 1: 
            return 'CLOUDY'
        default:
            return 'NOTSET'
    }
}

/*
Retourne le texte qui va nous servir pour le HTML
[2] TODO: Compléter avec les différents résultats de la fonction
2        getWeatherStringFromCode
[2] TODO: Attention, ne faites pas un switch "géant" 
*/
function getWeatherTextFromString(weather_sting){
    switch(weather_sting){
        case 'SUNNY':
            return 'Yes, it is !'
        case 'CLOUDY':
            return 'Not really..'
        case 'NOTSET':
            return 'Checking status...'
    }
}

function renderHTML(weather_string, weather_text){
    document.querySelector('#js-bg-container').classList.add(weather_string);
    document.querySelector('#js-text-title').innerText = weather_text;
}