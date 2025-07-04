import { create } from 'zustand';

const useCalCulStore = create((set) => ({
  quantity: 0,
  unitPrice: 0,
  calculation: null,
  setCalculation:(calculation) => set({ calculation }),
  setQuantity: (quantity) => set({ quantity }),
  setUnitPrice: (unitPrice) => set({ unitPrice }),
  setValues:(quantity, unitPrice) => set({ quantity, unitPrice })
  }
));

export default useCalCulStore;