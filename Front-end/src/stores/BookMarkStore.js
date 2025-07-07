import {create} from 'zustand';

export const useBookmarkStore = create((set) => ({
  bookmarkList: [],
  setBookmark: (bookmarkList) => set({bookmarkList}),
  
}));