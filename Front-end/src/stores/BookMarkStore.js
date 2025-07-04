import {create} from 'zustand';

export const useBookmarkStore = create((set) => ({
  bookmark: [],
  setBookmark: (bookmark) => set({bookmark})
}));