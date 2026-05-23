import { Category, CategoryGroup } from "@/types/category";
import { request } from "./client";

const CategoriesAPI = {
  getAll: async (): Promise<Category[]> => {
    const data = await request<CategoryGroup[]>("/categories");
    return (data ?? []).map((item: CategoryGroup) => item.parent);
  },
};

export default CategoriesAPI;
