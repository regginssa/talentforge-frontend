import { SEO } from "@/components/atoms";
import { AuthorizedFooter, FreelancerHeader } from "@/components/organisms";
import { TSEO } from "@/types/components.types";

interface FreelancerLayoutProps {
  seo: TSEO;
  children: React.ReactNode;
}

export default function FreelancerLayout({
  seo,
  children,
}: FreelancerLayoutProps) {
  return (
    <>
      <FreelancerHeader />
      <SEO {...seo} />
      <main className="max-w-7xl mx-auto space-y-10">{children}</main>
      <AuthorizedFooter />
    </>
  );
}
