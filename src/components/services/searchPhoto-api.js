const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37322258-fbe2dcb7b76c85722debd51ee';

export default async function fetchPhotos(nextSearch, page) {
  try {
    const response = await fetch(
      `${BASE_URL}/?q=${nextSearch}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Ошибка при запросе данных');
    }
    const data = await response.json();
    // console.log('Данные после response.json():', data);
    return data;
  } catch (error) {
    // console.error('Ошибка после response.json():', error);
    throw error;
  }
}
