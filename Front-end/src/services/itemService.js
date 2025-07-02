import apiClient from '../lib/apiClient';

export const categori = async () => {
  const response = await apiClient.post('/api/cate/save');
  return response.data;
};

// export const createItem = async (itemData) => {
//   const response = await apiClient.post('/api/cate', itemData);
//   return response.data;
// };
