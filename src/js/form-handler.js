import { Notify } from 'notiflix';
import { fetchPhotoes } from './pixabay-api';
import { galleryElemnt, renderInterface, loader } from './gallery';
export { totalPagesCount, pageNumber, galleryObserver };

const form = document.querySelector('.search-form');
//variables
let searchTermin = '';
let totalPagesCount = 0;
let pageNumber = 0;
let observerOptions = {
  rootMargin: '300px',
  threshold: 0,
};
const galleryObserver = new IntersectionObserver(
  loadMorePhotoes,
  observerOptions
);

//handlers
form.addEventListener('submit', formSearchHandler);

//functions
async function formSearchHandler(event) {
  event.preventDefault();
  galleryObserver.unobserve(document.querySelector('.observe-target'));
  pageNumber = 1;
  if (form.searchQuery.value.trim() === '') {
    Notify.failure('Please enter any word!');
    return;
  }

  searchTermin = form.searchQuery.value;
  galleryElemnt.innerHTML = ' ';
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

    renderInterface(hits);
  } catch (error) {
    Notify.failure('Error! Please reload page!');
  }

  form.reset();
  loader.classList.add('hidden');
  setTimeout(() => {
    galleryObserver.observe(document.querySelector('.observe-target'));
  }, 1000);
}

async function loadMorePhotoes(entry) {
  console.log(entry[0].isIntersecting, entry);
  if (entry[0].isIntersecting === true) {
    pageNumber++;
    if (pageNumber === totalPagesCount + 1) {
      galleryObserver.unobserve(document.querySelector('.observe-target'));
      return;
    }
    loader.classList.remove('hidden');
    try {
      const { hits } = await fetchPhotoes(searchTermin, pageNumber);
      renderInterface(hits);
    } catch (error) {
      Notify.failure('Error! Please reload page!');
    }
    loader.classList.add('hidden');
  }
}
