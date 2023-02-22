import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
inputEl.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const searchCountry = (event.target.value.trim());
  if (searchCountry) {
  fetchCountries(searchCountry); 
  };
};