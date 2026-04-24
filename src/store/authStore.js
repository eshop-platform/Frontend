import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  login: (data) => {
    localStorage.setItem("token", data.token);

    set({
      user: {
        name: data.name,
        role: data.role,
      },
      token: data.token,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;