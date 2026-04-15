import { create } from "zustand";
import { User } from "@shared/type/user";
import {
  deleteStoredToken,
  getStoredToken,
  setStoredToken,
} from "@/lib/tokenStorage";

const TOKEN_KEY = process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY?.trim() || "accessToken";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;

  setAuth: (user: User, accessToken: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: true,

  setAuth: async (user, accessToken) => {
    await setStoredToken(TOKEN_KEY, accessToken);
    set({ user, accessToken });
  },

  clearAuth: async () => {
    const token = get().accessToken;
    if (token) {
      await deleteStoredToken(TOKEN_KEY);
    }
    set({ user: null, accessToken: null });
  },

  // 앱 시작할때 저장된 로그인 상태 복원
  hydrate: async () => {
    try {
      const token = await getStoredToken(TOKEN_KEY);
      set({ accessToken: token ?? null, isLoading: false });
    } catch {
      set({ accessToken: null, isLoading: false });
    }
  },
}));
