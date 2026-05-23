import { Category } from "@/types/category";
import { request } from "./client";

const CategoriesAPI = {
  getAll: async (): Promise<Category[]> => await request("/categories"),
};

export default CategoriesAPI;
