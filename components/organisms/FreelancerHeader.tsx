import { Icon } from "@iconify/react";
import Link from "next/link";
import { WorkLancLogo } from "../atoms";

type NavLink = {
  label: string;
  href: string;
};

type NavSection = {
  heading?: string;
  items: NavLink[];
};

interface HoverNavMenuProps {
  label: string;
  sections: NavSection[];
}

function HoverNavMenu({ label, sections }: HoverNavMenuProps) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-800 transition-all duration-200 hover:text-slate-600 cursor-pointer"
      >
        <span>{label}</span>
        <Icon
          icon="mdi:chevron-down"
          className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      <div className="invisible pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
        <div className="w-56 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
          {sections.map((section, index) => (
            <div key={`${label}-${section.heading ?? `section-${index}`}`}>
              {index > 0 && (
                <div className="h-[1px] bg-slate-200 w-full my-2" />
              )}
              {section.heading && (
                <p className="text-slate-600 text-xs p-2 font-medium">
                  {section.heading}
                </p>
              )}

              <ul>
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-lg p-2 text-sm transition-all duration-200 hover:bg-slate-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FreelancerHeader() {
  const navs = {
    findWorkNavs: [
      {
        items: [
          { label: "Find work", href: "#" },
          { label: "Saved jobs", href: "#" },
          { label: "Proposals and offers", href: "#" },
        ],
      },
      {
        heading: "Reach more clients",
        items: [
          { label: "Your services", href: "#" },
          { label: "Promote with ads", href: "#" },
          { label: "Direct contracts", href: "#" },
        ],
      },
    ],
    deliverWorkNavs: [
      {
        items: [
          { label: "Your active contracts", href: "#" },
          { label: "Contract history", href: "#" },
          { label: "Hourly work daily", href: "#" },
        ],
      },
    ],
    manageFinancesNavs: [
      {
        items: [
          { label: "Financial overview", href: "#" },
          { label: "Your reports", href: "#" },
          { label: "Billings and earnings", href: "#" },
          { label: "Transactions", href: "#" },
        ],
      },
      {
        heading: "Payments",
        items: [{ label: "Withdraw earnings", href: "#" }],
      },
      {
        heading: "Taxes",
        items: [
          { label: "Tax forms", href: "#" },
          { label: "Tax information", href: "#" },
        ],
      },
    ],
  };

  return (
    <header className="w-full max-w-[90%] mx-auto py-2 flex items-center justify-between bg-white mb-10">
      <div className="flex items-center gap-10">
        <WorkLancLogo />

        <nav className="flex items-center gap-2">
          <HoverNavMenu label="Find work" sections={navs.findWorkNavs} />
          <HoverNavMenu label="Deliver work" sections={navs.deliverWorkNavs} />
          <HoverNavMenu
            label="Manage finances"
            sections={navs.manageFinancesNavs}
          />
          <Link
            href="#"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-800 transition-all duration-200 hover:text-slate-600 cursor-pointer"
          >
            Messages
          </Link>
        </nav>
      </div>
    </header>
  );
}
