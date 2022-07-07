import './css/styles.css';
import Notiflix from 'notiflix';

import { getUser } from './getUser';

const axios = require('axios').default;

const PIXABEY_KEY = '28393009-563cada9a4af8f72bfd4d9668';
const BASE_HTTP = 'https://pixabay.com/api/';

// const submitBtn = document.querySelector('#submit-button');
const form = document.querySelector('#search-form');
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
document.querySelector(".load-more").hidden = true;

let page = '';

function onFormSubmit(evt) {
    evt.preventDefault();
    page = 1;
    localStorage.setItem("inputValue", `${this.searchQuery.value}`);
    document.querySelector(".load-more").hidden = true;

    getUser(this.searchQuery.value, page)
        .then(response => {
            
            if (response.data.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            }
           
            return response.data.hits;
        })
        .then((response) => {
            gallery.innerHTML = "";
            gallery.insertAdjacentHTML("beforeend", cardsMarcup(response));
            document.querySelector(".load-more").hidden = false;
            
        })
        .catch(() => { });
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

function endOfContentMcp() {
    return "<p class ='search-form'>We're sorry, but you've reached the end of search results.</p>"
}

function onLoadMore() {
    page += 1;
    const inputValue = localStorage.getItem("inputValue");

    getUser(inputValue, page)
        .then(response => {
            if (page * 40 >= response.data.totalHits) {
                document.querySelector(".load-more").hidden = true;
                document.body.insertAdjacentHTML("beforeend", endOfContentMcp());
            }
            return response.data.hits;
        })
        .then((response) => {
            gallery.insertAdjacentHTML("beforeend", cardsMarcup(response));
            
        }).then(() => {
            const cardHeight = document
                .querySelector(".gallery")
                .firstElementChild.getBoundingClientRect();
            const cardHeightDoubled = cardHeight.height * 2;

            window.scrollBy({
              top: `${cardHeightDoubled}`,
              behavior: "smooth",
            }); 
        })
        .catch(() => { });
}

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);