import { Notify } from 'notiflix';
import { fetchPhotoes } from './pixabay-api';
import { galleryElemnt, renderInterface, loader } from './gallery';
export { totalPagesCount, pageNumber };

const form = document.querySelector('.search-form');
//variables
let searchTermin = '';
let totalPagesCount = 0;
let pageNumber = 0;
//handlers
form.addEventListener('submit', formSearchHandler);

//functions
async function formSearchHandler(event) {
  event.preventDefault();
  pageNumber++;
  searchTermin = form.searchQuery.value;
  galleryElemnt.innerHTML = '';
  loader.classList.remove('hidden');
  try {
    const { totalHits, hits } = await fetchPhotoes(searchTermin, pageNumber);
    totalPagesCount = Math.ceil(totalHits / 40);
    if (totalHits <= 0) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results"
      );
    } else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    await renderInterface(hits);
  } catch (error) {
    Notify.failure('Error! Please reload page!');
  }
  pageNumber++;
  form.reset();
  loader.classList.add('hidden');
}
window.addEventListener('scroll', loadMorePhotoes);
async function loadMorePhotoes() {
  const galleryRect = galleryElemnt.getBoundingClientRect();

  if (galleryRect.bottom <= 1000) {
    if (pageNumber === totalPagesCount + 1) {
      return;
    }
    loader.classList.remove('hidden');
    try {
      const { hits } = await fetchPhotoes(searchTermin, pageNumber);
      await renderInterface(hits);
      pageNumber++;
    } catch (error) {
      Notify.failure('Error! Please reload page!');
    }
  }
  loader.classList.add('hidden');
}
