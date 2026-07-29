import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductStore {
  userCountry: string | null;
  setUserCountry: (country: string) => void;
  getUserCountry: () => string | null;
}

export const useCountryStore = create(
  persist<ProductStore>(
    (set, get) => ({
      userCountry: null,

      setUserCountry: (country: string) => set({ userCountry: country }),

      getUserCountry: () => get().userCountry,
    }),

    {
      name: "country-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
