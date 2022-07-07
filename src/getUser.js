const axios = require('axios').default;

const PIXABEY_KEY = '28393009-563cada9a4af8f72bfd4d9668';
const BASE_HTTP = 'https://pixabay.com/api/';

export async function getUser(value, page) {

    const params = {
        key: PIXABEY_KEY,
        q: `${value}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 40,
        page: `${page}`,
    }
    const searchParams = new URLSearchParams(params);
  try {
      const response = await axios.get(`${BASE_HTTP}?${searchParams}`);
        return response;
  } catch (error) {}   
};