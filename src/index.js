import './styles.css';
var debounce = require('lodash.debounce');
import fetchCountries from './fetchCountries.js'
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/core/dist/PNotify.css';


const input = document.querySelector('#srch');
const searchResult = document.querySelector('.searchRes');
const oninput = debounce(searchData, 1500)
input.addEventListener('input',oninput,{passive: true});


function searchData(e){
  // console.log(input.value);
  
  if (input.value !==''){
    fetchCountries(input.value, onGetData); 
  }
}

function onGetData(data){

  if (data.length ===1){
printCountry(data[0]);
}
else{
  if (data.length <10){
    // console.log(data);
    printCountriesList(data);
  }
  else {
    // console.log(data.length);
    printError(data);
  }
}
}


function printCountry(country){
  // const lang = Object.values(country.languages[0]);
  // console.log(lang);
  const Handlebars = require('handlebars');
  const template = Handlebars.compile(`
  <h1 class="country__name">{{name}}</h1>
  
  <div class="country_info" style='display:flex; justify-content:space-between'>
  <div class="country_data" style='text-align:left'>
      
  <h2 class="country_cap">Capital: <span style='font-weight:normal'>{{capital}}</span></h2>
  <h2 class="country_popul">Population: <span style='font-weight:normal'>{{population}}</span></h2>
  {{#with languages}}
  <h2 class="country_lang">Languages:</h2>
  <ul class="lang-list" style='margin:0; font-weight:normal'>
  {{#each this}}
    <li class="lang-list__item">{{this.name}}</li>
    {{/each}}
    
  </ul>
  {{/with}}
  </div>
  
  
  <div class="country_flag">
  <img
  src={{flag}}
  alt='flag'
  class="country__image"
  style = 'width: 200px; height: 200px';
  />
  </div>

  </div>
  
  `);
  

  const countryItem = template (country); 
  searchResult.innerHTML='';
  searchResult.insertAdjacentHTML('afterbegin', countryItem);
}


function printCountriesList(countriesArray){

  
    // document.querySelector('searchRes').innerHTML=''; 
  

  const Handlebars = require('handlebars');
  const template = Handlebars.compile(`
  
  <ul class="countries-list" style='margin:0; text-align:left; font-weight:bold'>
  {{#each this}}
    <li class="countriesList__item">{{this.name}}</li>
    {{/each}}
    
  </ul>
  
  `);
  

  const countries = template (countriesArray); 
  // console.log(countries)
  searchResult.innerHTML='';
  searchResult.insertAdjacentHTML('afterbegin', countries);
}
  

function printError(obj){

  searchResult.innerHTML='';
  
  const myError = error({
    text: "Too many matches found. Please enter more specific query!",
    delay: 1500
  });
  
}