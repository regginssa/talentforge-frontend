import { User } from "@/types/user";
import { request } from "./client";

const AuthAPI = {
  signup: async (body: User) =>
    await request("/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  signin: async (body: any) =>
    await request("/signin", { method: "POST", body: JSON.stringify(body) }),
};

export const TOKEN_KEY = "Authenticate-Token";

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default AuthAPI;
