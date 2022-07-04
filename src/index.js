import './css/styles.css';
import Notiflix from 'notiflix';

import { getUser } from './getUser';

const axios = require('axios').default;

const PIXABEY_KEY = '28393009-563cada9a4af8f72bfd4d9668';
const BASE_HTTP = 'https://pixabay.com/api/';

// const submitBtn = document.querySelector('#submit-button');
const form = document.querySelector('#search-form');
const gallery = document.querySelector(".gallery");



function onFormSubmit(evt) {
    evt.preventDefault();

    getUser(this.searchQuery.value)
        .then(response => {
            if (response.data.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            }
            // console.log(response.data.hits);
            return response.data.hits;
        })
        .then((response) => {
            gallery.insertAdjacentHTML("beforeend", cardsMarcup(response));
            
        })
        .catch(() => {});
};


function cardsMarcup(cards) {
    const marcup = cards.map(card => {
        return `
        <li class="photo-card">
          <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
          <ul class="info">
            <li class="info-item">
              <b>Likes</b> ${card.likes}</p>
            </li>
            <li class="info-item">
              <b>Views</b> <p> ${card.views}</p>
            </li>
            <li class="info-item">
              <b>Comments</b> <p> ${card.comments}</p>
            </li>
            <li class="info-item">
              <b>Downloads</b> <p> ${card.downloads}</p>
            </li>
          </ul>
        </li>`
    }).join("");
return marcup;
};

form.addEventListener('submit', onFormSubmit)