import axios from 'axios';

export const fetchDataFromApi = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
