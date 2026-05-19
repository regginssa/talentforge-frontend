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

export default AuthAPI;
