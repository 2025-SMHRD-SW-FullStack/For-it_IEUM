import { create } from 'zustand';

export const useTokenStore = create((set) => ({
  accessToken: null,
  isLoggedIn: false,

  // 토큰 설정
  setAccessToken: (token) =>
    set({
      accessToken: token,
      isLoggedIn: true,
    }),

  // 토큰 제거
  clearAccessToken: () =>
    set({
      accessToken: null,
      isLoggedIn: false,
    }),
}));