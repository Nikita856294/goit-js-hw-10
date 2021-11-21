import './css/styles.css';
import './css/index.css';
import fetchCountries from './js/api.js';
import { refs } from './js/refs.js';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, 300));

function onSearch(e) {
  const inputValue = e.target.value.trim();
  console.log(inputValue);

  fetchCountries(inputValue).then(data => renderMarkup(data));

  if (inputValue.length === 0) {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }
}
function renderMarkup(countries) {
  if (countries.length > 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
  }
  if (countries.length >= 2 && countries.length <= 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return renderListMarkup(countries);
  }
  if (countries.length === 1) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return renderInfoMarkup(countries);
  }
}

function renderListMarkup(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li class="gallery_item">
<img class="image-country" src="${flags.svg}" alt="Flag of ${name.official}"">
<p class="country-name">${name.official}</p>
</li>
`;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', markup);
}
function renderInfoMarkup(countries) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      console.log(flags.svg);
      return `<div class="country">
<img class="country-flag" src="${flags.svg}" alt="Flag of ${name.official}>
<h3 class="country-name--info">${name.official}</h3>
<ul class="country-list">
<li class="country-item"><span class="country-item--span">Capital</span>:${capital}</li>
<li class="country-item"><span class="country-item--span">Population</span>:${population}</li>
<li class="country-item"><span class="country-item--span">Languages</span>:${Object.values(
        languages,
      )}</li>
</ul>
</div>
`;
    })
    .join('');

  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}
