import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40858568-c2cbea82fefa532e5a07e25a9';

export const getImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        page,
        per_page: perPage,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
