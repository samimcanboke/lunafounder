import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../services/AxiosInstance";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      changeExisting: async (walletAddress) => {
        try {
          set({ loading: true, error: null });
          const response = await fetch(
            `https://api.lunafounder.io/api/auth/change-existing`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ walletAddress }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Change existing failed");
          }

          return { success: true };
        } catch (error) {
          set({ error: error.message, loading: false });
          return { success: false, error: error.message };
        }
      },

      changeExistingPassword: async (walletAddress, newPassword) => {
        try {
          set({ loading: true, error: null });
          const response = await fetch(
            `https://api.lunafounder.io/api/auth/change-existing-password`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                walletAddress,
                newPassword,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Password change failed");
          }

          set({ loading: false });
          return { success: true, username: data.username };
        } catch (error) {
          set({ error: error.message, loading: false });
          return { success: false, error: error.message };
        }
      },

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const response = await fetch(
            `https://api.lunafounder.io/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Login failed");
          }

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });

          localStorage.setItem("token", data.token);
          return { success: true };
        } catch (error) {
          set({ error: error.message, loading: false });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem("token");
      },

      verifyToken: async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            set({ isAuthenticated: false });
            return false;
          }

          // const response = await fetch(
          //   `https://api.lunafounder.io/api/auth/verify`,
          //   {
          //     method: "POST",
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );

          const response = await axiosInstance.post("/auth/verify");

          // const data = await response.json();
          const data = response.data;

          if (!response.ok) {
            throw new Error(data.error || "Token verification failed");
          }

          set({
            user: data.user,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          set({ isAuthenticated: false });
          localStorage.removeItem("token");
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
