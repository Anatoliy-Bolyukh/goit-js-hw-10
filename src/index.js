
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
// import 'notiflix/dist/notiflix-3.2.5.min.css'
import { fetchCountries } from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const countryListEl = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))



function onSearch(event) {
    if (event.target.value.trim() !== "") {
        fetchCountries(event.target.value.trim()).then(data => {

            if (data.length > 10) {
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

            } if (data.length >= 2 && data.length <= 10) {
                countryListEl.innerHTML = data.map(({ flags: { svg }, name: { common } }) => {
                    return `<li>
                    <img  src ='${svg}'>
                    <p>${common}</p>
                    </li>`
                }).join('');
            } else {
                countryListEl.innerHTML = "";

            } if (data.length === 1) {
                countryInfo.innerHTML = data.map(({ flags: { svg }, name: { common }, capital, population, languages }) => {
                    return `<li>
                <div>
                    <img src="${svg}" alt="${common}" width="170" height="100"> 
                    <h1>${common}</h1>
                </div>
                    <p><b>Capital</b>: ${capital}</p>
                    <p><b>Population</b>: ${population}</p>
                    <p><b>Languages</b>: ${Object.values(languages)}</p>
                </li> `
                }).join('');
            } else {
                countryInfo.innerHTML = "";
            }

            if (event.target.value.trim() === 'Russia' || event.target.value.trim() === 'russia' || event.target.value.trim() === 'Russi' || event.target.value.trim() === 'russi') {
                alert('Кацап завжди був мудаком ну як пустить його в Європу? Де треба жить своїм умом він же підставить свою жопу. Тому ще в Києвській Русі на віче предки говорили: якщо зустрінеш десь, колись то зразу бий кацапа в рило. Кацапа звідусіль жени – хай здохне в ямі при дорозі. Ти подаєш йому води, а він вже сере на порозі.')
                countryInfo.innerHTML = `<li>
                <img src="https://upload.wikimedia.org/wikipedia/uk/4/44/Hulak_Kacap.jpg" alt="гавно" width="300" height="400">
                </li>`
            }
        })

    }



}


