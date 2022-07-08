export function cardsMarcup(cards) {
    const marcup = cards.map(card => {
        return `
        <li class="photo-card">
            <a class="gallery-link" href="${card.largeImageURL}">
                <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
            </a>
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
        </li>
        `
    }).join("");
return marcup;
};

export function endOfContentMcp() {
    return "<p class ='search-form end-of-content'>We're sorry, but you've reached the end of search results.</p>"
}