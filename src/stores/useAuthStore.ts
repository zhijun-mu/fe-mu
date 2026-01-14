import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  userInfo: any;
  setToken: (token: string) => void;
  setUserInfo: (userInfo: any) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      userInfo: null,
      setToken: (token: string) => set({ token, isAuthenticated: true }),
      setUserInfo: (userInfo: any) => set({ userInfo }),
      clearAuth: async () => set({ token: null, isAuthenticated: false, userInfo: null }),
    }),
    {
      name: "mu-auth-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
