// stores/CalculStore.js
import { create } from 'zustand';

const useCalCulStore = create((set) => ({
  quantity: '',
  unitPrice: '',
  calculation: '',
  setQuantity: (quantity) => set({ quantity }),
  setUnitPrice: (unitPrice) => set({ unitPrice }),
  setValues: (quantity, unitPrice) => set({ quantity, unitPrice }),
  setCalculation: (calculation) => set({ calculation }),
  reset: () => set({ quantity: '', unitPrice: '', calculation: '' }),
}));

export default useCalCulStore;
