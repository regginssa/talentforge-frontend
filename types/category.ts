export interface CategoryChild {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  children: CategoryChild[];
}

export interface CategoryGroup {
  parent: Category;
}
