import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  login: (data) => {
    localStorage.setItem("token", data.token);

    const user = data.user ?? {};

    set({
      user: {
        id: user.id ?? null,
        name: user.username ?? user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? data.role ?? "user",
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
