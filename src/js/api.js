import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { refs } from './refs';
export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      throw new Error(response.status);
    }
    return response.json();
  });
}
