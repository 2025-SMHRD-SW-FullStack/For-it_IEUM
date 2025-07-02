import axios from 'axios';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://192.168.219.217:8088/ieum',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 필요 시 쿠키도 같이 전송
});

// 요청 전에 토큰을 자동으로 헤더에 붙이도록 설정
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 또는 sessionStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient
