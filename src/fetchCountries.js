import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
const listCountryEl = document.querySelector(".country-list");
const infoCountryEl = document.querySelector(".country-info");   

listCountryEl.innerHTML = '';
infoCountryEl.innerHTML = '';

fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
   .then(response => {
    // Response handling
    if (response.status === 404) {
    throw new Error();
    };
    return response.json();
    })
   .then(data => {
    // Data handling
    if (data.length > 10) {
    Notify.info("Too many matches found. Please enter a more specific name.");
    return;
    };
    if (data.length > 2 && data.length <= 10) {
    const countryList = [];
        for (let i = 0; i < data.length; i += 1) {
        countryList.push(
       `<li class="list-group">
        <img src="${data[i].flags.svg}" alt="${data[i].name.official}" width="30"/>
        <p class="country-name">${data[i].name.official}</p>
        </li>`
        );
        };
        
    const markUpList = countryList.join(' ');
    listCountryEl.innerHTML = markUpList;
    return;
    };

    if (data.length === 1) {
    const markUpCountry =
    `<div class="country-title">
    <img src="${data[0].flags.svg}" alt="${data[0].name.official}" width="30"/>
    <p class="country-name-card">${data[0].name.official}</p>
    </div>
    <p class="country-indicator">Capital: <span class="country-value">${data[0].capital}</span></p>
    <p class="country-indicator">Population: <span class="country-value">${data[0].population}</span></p>
    <p class="country-indicator">Languages: <span class="country-value">${Object.values(data[0].languages).join(', ')}</span></p>`;
    infoCountryEl.innerHTML = markUpCountry;
    return;
    };
    }
    )
    .catch(error => {
    // Error handling
    Notify.failure("Oops, there is no country with that name");
    });
};