import { fetchPhotoes, pageNumber } from './pixabay-api';
import { Notify } from 'notiflix';
import { galleryElemnt, renderInterface, loader } from './gallery';
export { totalPagesCount };

const form = document.querySelector('.search-form');
//variables
let totalPagesCount = 0;
//handlers
form.addEventListener('submit', formSearchHandler);

//functions
async function formSearchHandler(event) {
  event.preventDefault();
  pageNumber = 1;
  searchTermin = form.searchQuery.value;
  galleryElemnt.innerHTML = '';
  loader.classList.remove('hidden');
  try {
    const { totalHits, hits } = await fetchPhotoes(searchTermin);
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
  form.reset();
  loader.classList.add('hidden');
}
