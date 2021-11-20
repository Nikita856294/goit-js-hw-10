import './css/styles.css';
import './css/index.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import fetchCountries from './js/api.js';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onSearch, 300));

function onSearch(e) {
  const inputValue = e.target.value;
  console.log(inputValue);
  fetchCountries(inputValue).then(data => renderListMarkup(data));

  if (inputValue.length <= 0) {
    return (refs.ul.innerHTML = '');
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
  if (countries.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
  }
  refs.ul.insertAdjacentHTML('beforeend', markup);
}
function renderInfoMarkup(countries) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      console.log(flags.svg);
      return `<div class="country">
<img class="country-flag" src="${flags.svg}" alt="Flag of ${name.official}>
<h3 class="country-name">${name.official}</h3>
<ul class="country-list">
<li class="country-item"><span class="country-item--span">Capital</span>:${capital}</li>
<li class="country-item"><span class="country-item--span">Population</span>:${population}</li>
<li class="country-item"><span class="country-item--span">Languages</span>:${languages}</li>
</ul>
</div>
`;
    })
    .join('');

  refs.ul.insertAdjacentHTML('beforeend', markup);
}
