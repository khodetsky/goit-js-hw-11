import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getUser } from './getUser';
import { cardsMarcup, endOfContentMcp } from './marcup';

const axios = require('axios').default;

const PIXABEY_KEY = '28393009-563cada9a4af8f72bfd4d9668';
const BASE_HTTP = 'https://pixabay.com/api/';

const form = document.querySelector('#search-form');
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const toTopBtn = document.querySelector(".to-top-button");

document.querySelector(".load-more").hidden = true;
document.querySelector(".to-top-button").hidden = true;

let page = '';
// let lightbox;

function onFormSubmit(evt) {
    evt.preventDefault();
    page = 1;
    localStorage.setItem("inputValue", `${this.searchQuery.value}`);
    document.querySelector(".load-more").hidden = true;

    if (document.querySelector(".end-of-content")) {
        const endOfContentMsg = document.querySelector(".end-of-content");
        endOfContentMsg.remove();
    };

    getUser(this.searchQuery.value, page)
        .then(response => {
            if (response.data.totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            } else {
                if (response.data.totalHits < 40 ) {
                    document.querySelector(".load-more").hidden = true;
                    console.log('form');
                    loadMoreBtn.insertAdjacentHTML("afterend", endOfContentMcp());
                } else {
                    document.querySelector(".load-more").hidden = false;
                }

            Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
            return response.data.hits;
            }
            
        })
        .then((response) => {
            gallery.innerHTML = "";
            gallery.insertAdjacentHTML("beforeend", cardsMarcup(response));
            var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250});
            
        })
        .catch(() => { });
};

function onLoadMore() {
    page += 1;
    const inputValue = localStorage.getItem("inputValue");

    getUser(inputValue, page)
        .then(response => {
            if (response.data.totalHits !== 0) {
                if (page * 40 >= response.data.totalHits) {
                    document.querySelector(".load-more").hidden = true;
                loadMoreBtn.insertAdjacentHTML("afterend", endOfContentMcp());
                }
                return response.data.hits;
            }
            
        })
        .then((response) => {
            gallery.insertAdjacentHTML("beforeend", cardsMarcup(response));
            var lightboxSecond = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250});
            
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
};

function toTopBtnHidden() {
    if (window.scrollY) {
        document.querySelector(".to-top-button").hidden = false;
    }
}

function onToTopBtnClick() {
    setTimeout(() => {
    return document.querySelector(".to-top-button").hidden = true;
    }, 1000);

    window.scroll({
    top: 0,
    behavior: "smooth",
    });    
};

window.addEventListener('scroll', toTopBtnHidden)
form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
toTopBtn.addEventListener('click', onToTopBtnClick)