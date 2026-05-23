export interface CategoryChildren {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  children: CategoryChildren[];
}
