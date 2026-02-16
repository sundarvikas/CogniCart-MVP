import axios from 'axios';

const API_BASE_URL = 'https://api.cognicart.ai';

export const generateCatalogJSON = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/engine1/extract`,
      {
        image: payload.image,
        title: payload.title,
        description: payload.description,
        category: payload.category,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to generate catalog JSON'
    );
  }
};
