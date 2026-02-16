import axios from 'axios';

const API_BASE_URL = 'https://api.cognicart.ai';

export const submitProductToCatalog = async (catalogJSON) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/catalog/products`,
      catalogJSON,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to submit product to catalog'
    );
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/catalog/products`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};
