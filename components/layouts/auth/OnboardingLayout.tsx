import Link from "next/link";
import { SocialGroup } from "@/components/molecules";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TSEO } from "@/types/components.types";
import { SEO, WorkLancLogo } from "@/components/atoms";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  seo: TSEO;
}

const navs = [
  { label: "About Us", href: "#" },
  { label: "Feedback", href: "#" },
  { label: "Trust, Safety & Security", href: "#" },
  { label: "Help & Support", href: "#" },
  { label: "WorkLanc Foundation", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "CA Notice at Collection", href: "#" },
  { label: "Your Privacy Choices", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Desktop App", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Enterprise Solutions", href: "#" },
  { label: "Release notes", href: "#" },
];

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  showFooter,
  seo,
}) => {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="min-h-screen flex flex-col">
      {seo && <SEO {...seo} />}
      {/* Header */}
      <header className="w-full max-w-[80%] mx-auto p-6 flex items-center justify-between bg-white">
        <WorkLancLogo />
        <div ref={ref} className="relative">
          <button className="cursor-pointer" onClick={() => setOpen(true)}>
            <Icon
              icon="material-symbols-light:account-circle-outline"
              width={32}
            />

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute bg-white top-full w-[240px] right-0 max-h-72 overflow-y-auto z-40 mt-1 shadow-md p-1 rounded-lg border border-slate-200 flex flex-col"
                >
                  <div className="flex flex-col items-center justify-center pt-6 pb-4">
                    <Icon
                      icon="material-symbols-light:account-circle-outline"
                      width={100}
                    />
                    <div className="mt-2">
                      <h3 className="">Jhon Smthi</h3>
                      <p className="text-xs text-slate-600">Freelancer</p>
                    </div>
                  </div>

                  <div>
                    <button className="py-2 px-4 transition-all duration-200 hover:bg-slate-200 cursor-pointer w-full rounded-md flex items-center gap-4">
                      <Icon
                        icon="material-symbols-light:settings-outline"
                        width={24}
                      />
                      <span className="text-xs">Close account</span>
                    </button>
                    <button className="py-2 px-4 transition-all duration-200 hover:bg-slate-200 cursor-pointer w-full rounded-md flex items-center gap-4">
                      <Icon icon="material-symbols-light:logout" width={24} />
                      <span className="text-xs">Close account</span>
                    </button>
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Main */}
      <main
        className={`flex-1 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto ${!showFooter && "mb-20"}`}
      >
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="w-[70%] mx-auto border-t border-slate-200 py-14 text-xs text-slate-500">
          <div className="grid grid-cols-4">
            <ul className="flex flex-col gap-4 ">
              {navs.slice(0, 3).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-4 ">
              {navs.slice(3, 6).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-4 ">
              {navs.slice(6, 10).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-4 ">
              {navs.slice(10, navs.length).map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className=" hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-6">
              <span>Follow Us</span>
              <SocialGroup />
            </div>
            <div className="flex items-center gap-6">
              <span>Mobile app</span>
              <Link href="#" className="p-1 rounded-full hover:bg-slate-100">
                <Icon icon="mdi:apple" width={24} />
              </Link>
              <Link href="#" className="p-1 rounded-full hover:bg-slate-100">
                <Icon icon="mdi:android" width={24} />
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
