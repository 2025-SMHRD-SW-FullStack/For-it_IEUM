import { create } from 'zustand';

const useCardStore = create((set) => ({
  selectedCard: null,
  setSelectedCard: (card) => set({ selectedCard: card }),
  clearSelectedCard: () => set({ selectedCard: null }),
}));

export default useCardStore;
