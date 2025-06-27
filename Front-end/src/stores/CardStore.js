import { create } from 'zustand';

const useCardStore = create((set) => ({
  interestedCard: null,
  setInterestedCard: (card) => set({ interestedCard: card }),
  clearInterestedCard: () => set({ interestedCard: null }),
}));

export default useCardStore;
