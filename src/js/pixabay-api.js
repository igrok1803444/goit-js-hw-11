import axios from 'axios';

export { fetchPhotoes, pageNumber, searchTermin };
//constants
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&safesearch=true&orientation=horizontal&per_page=40';
const API_KEY = '31974365-341749123fa485f09eb8b1d6d';

//variables
let pageNumber = 1;
let searchTermin = '';
//functions
async function fetchPhotoes(searchTermin) {
  const response = await axios.get(
    `${BASE_URL}&key=${API_KEY}&q=${searchTermin}&page=${pageNumber}`
  );
  pageNumber++;
  return response.data;
}
