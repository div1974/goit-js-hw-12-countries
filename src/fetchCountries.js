import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/core/dist/PNotify.css';

const mainAddr = 'https://restcountries.eu/rest/v2/name/'

export default function fetchCountries(searchQuery, callback){
    fetch(mainAddr + searchQuery)
    .then(res=>{
        if (res.ok){
        return res.json()
        }
        else {
            return Promise.reject(res)
        }
    })
    .then(d=>callback(d))
    .catch(err=>{
        console.warn('No found any data.Error 404.');
        // console.log(error)
        const myError = error({
            text: "No matches found. Please enter another query!",
            delay: 2000
          });
    });
}

