import './css/styles.css';



const axios = require('axios').default;

const PIXABEY_KEY = '28393009-563cada9a4af8f72bfd4d9668';
const BASE_HTTP = 'https://pixabay.com/api/';

const submitBtn = document.querySelector('#submit-button');
const form = document.querySelector('#search-form');

async function getUser(value) {
    const searchParams = new URLSearchParams({
        key: PIXABEY_KEY,
        q: `${value}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 40,
    });
  try {
    const response = await axios.get(`${BASE_HTTP}?${searchParams}`);
    //   const pictures = await response.json();
        return response;
  } catch (error) {
    console.error(error);
    }
    
};

function onFormSubmit(evt) {
    evt.preventDefault();
    // getUser(this.searchQuery.value);
    getUser(this.searchQuery.value).then(response => console.log(response));;
};

form.addEventListener('submit', onFormSubmit)