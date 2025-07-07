import { create } from 'zustand';

export const useTokenStore = create((set) => {
  // accessToken: null,
  // isLoggedIn: false,
  const storedToken = localStorage.getItem('accessToken')
  return{

    accessToken:storedToken,
    isLoggedIn:!!storedToken,
    hasNewNotifications: false, // ✅ 알림 상태도 저장
  // 토큰 설정
  setAccessToken: (token) =>
    {
      localStorage.setItem('accessToken', token);
      set({ accessToken: token, isLoggedIn: true, hasNewNotifications: true,});
    },

  // 토큰 제거
  clearAccessToken: () =>
    {
      localStorage.removeItem('accessToken');
      set({ accessToken: null, isLoggedIn: false, hasNewNotifications: false });
    },
  clearNotifications: () => 
    {
    set({ hasNewNotifications: false });
    },
  };
});