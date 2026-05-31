import { SEO } from "@/components/atoms";
import { AuthorizedFooter, ClientHeader } from "@/components/organisms";
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
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <SEO {...seo} />
      <main className="w-full max-w-7xl mx-auto space-y-10 flex-1">
        {children}
      </main>
      <div className="w-full">
        <AuthorizedFooter />
      </div>
    </div>
  );
}
