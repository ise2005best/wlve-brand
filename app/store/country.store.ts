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

      setUserCountry: (country: string) => {
        if (!country) return;
        set({ userCountry: country });
        if (typeof document !== "undefined") {
          document.cookie = `country=${country}; path=/; max-age=31536000`;
        }
      },

      getUserCountry: () => get().userCountry,
    }),

    {
      name: "country-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
