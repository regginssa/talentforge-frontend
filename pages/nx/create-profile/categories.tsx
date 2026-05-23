import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import CategoriesAPI from "@/lib/api/categories";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Categories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.getAll,
  });

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch categories", { position: "top-center" });
    }
  }, [error]);

  const activeCategory = useMemo(
    () => categories?.find((c) => c.slug === selectedCategorySlug),
    [categories, selectedCategorySlug]
  );

  const toggleSpecialty = (slug: string) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) {
        toast.error("You can select up to 3 specialties", {
          position: "top-center",
        });
        return prev;
      }
      return [...prev, slug];
    });
  };

  return (
    <CreateProfileLayout
      title="Great, so what kind of work are you here to do?"
      description="Don't worry, you can change these choices later on."
      currentStep={2}
      totalSteps={10}
      seo={{
        title: "What are the main services you offer?",
        description: "What are the main services you offer?",
        url: "/nx/create-profile/categories",
      }}
    >
      <div className="flex items-start border-t border-slate-300 gap-6 py-6">
        <div className="w-1/4 min-w-[180px]">
          <p className="text-xs text-slate-500">Select 1 category</p>

          <ul className="border-r border-slate-300 mt-6 space-y-4 pr-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <li
                    key={i}
                    className="text-sm animate-pulse p-2 rounded-md bg-slate-100 h-6"
                  />
                ))
              : categories?.map((category) => (
                  <li
                    key={category.slug}
                    className={`text-sm cursor-pointer hover:text-blue-600 transition-all duration-200 ${
                      selectedCategorySlug === category.slug
                        ? "text-blue-600"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategorySlug(category.slug);
                      setSelectedSpecialties([]);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
          </ul>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 mb-6">
            Now, select 1 to 3 specialties
          </p>

          {!selectedCategorySlug ? (
            <p className="text-sm text-slate-400">
              Choose a category on the left to see specialties.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-3">
              {activeCategory?.children.map((child) => {
                const isSelected = selectedSpecialties.includes(child.slug);
                return (
                  <li key={child.slug}>
                    <button
                      type="button"
                      onClick={() => toggleSpecialty(child.slug)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      {child.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </CreateProfileLayout>
  );
}
