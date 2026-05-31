import { SEO } from "@/components/atoms";
import { AuthorizedFooter, AuthorizedHeader } from "@/components/organisms";
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
      <AuthorizedHeader />
      <SEO {...seo} />
      <main className="max-w-7xl mx-auto space-y-10">{children}</main>
      <AuthorizedFooter />
    </>
  );
}
