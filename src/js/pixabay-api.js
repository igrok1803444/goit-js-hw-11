import axios from 'axios';
import { pageNumber } from './form-handler';
export { fetchPhotoes, searchTermin };
//constants
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&safesearch=true&orientation=horizontal&per_page=40';
const API_KEY = '31974365-341749123fa485f09eb8b1d6d';

//variables

let searchTermin = '';
//functions
async function fetchPhotoes(searchTermin, pageNumber) {
  const response = await axios.get(
    `${BASE_URL}&key=${API_KEY}&q=${searchTermin}&page=${pageNumber}`
  );

  return response.data;
}
