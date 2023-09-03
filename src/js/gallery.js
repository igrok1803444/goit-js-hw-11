//imports
import { totalPagesCount } from './form-handler';
import simpleLightbox from 'simplelightbox';
import { pageNumber, fetchPhotoes } from './pixabay-api';
import { Notify } from 'notiflix';
//exports
export { galleryElemnt, loader, renderInterface };
//DOM navigation
const loader = document.querySelector('.loader');
const galleryElemnt = document.querySelector('.gallery');
const gallery = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
});
//listeners
window.addEventListener('scroll', loadMorePhotoes);
//functions
async function renderInterface(photoesArray) {
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
  <a  href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  galleryElemnt.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}
async function loadMorePhotoes() {
  const galleryRect = galleryElemnt.getBoundingClientRect();

  if (galleryRect.bottom <= 1000) {
    if (pageNumber === totalPagesCount + 1) {
      return;
    }
    loader.classList.remove('hidden');
    try {
      const { hits } = await fetchPhotoes(searchTermin);
      await renderInterface(hits);
    } catch (error) {
      Notify.failure('Error! Please reload page!');
    }
  }
  loader.classList.add('hidden');
}
