//imports
import { galleryObserver } from './form-handler';
import simpleLightbox from 'simplelightbox';

//exports
export { galleryElemnt, loader, renderInterface };
//DOM navigation
const loader = document.querySelector('.loader');
const galleryElemnt = document.querySelector('.gallery');
const gallery = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
});
//listeners
document.addEventListener('DOMContentLoaded', () => {
  const headerHeight = document.querySelector('.header').clientHeight;
  document.body.style.paddingTop = `${headerHeight}px`;
});
//functions
function renderInterface(photoesArray) {
  const markup = photoesArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a  href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" height="300" width="100%"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  galleryElemnt.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}
