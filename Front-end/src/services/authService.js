import apiClient from '../lib/apiClient';

export const login = async (credentials) => {
  const response = await apiClient.post('/api/login', credentials);

  const { accessToken } = response.data;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  // 추가로 백엔드에 logout API 호출할 수도 있음
};
