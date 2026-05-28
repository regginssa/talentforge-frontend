import { TSEO } from "@/types/components.types";
import Link from "next/link";
import FreelancerLayout from ".";

interface FreelancerSettingsLayoutProps {
  seo: TSEO;
  children: React.ReactNode;
}

export default function FreelancerSettingsLayout({
  seo,
  children,
}: FreelancerSettingsLayoutProps) {
  const settingNavs = [
    { label: "Contact Info", href: "/freelancers/settings/contact-info" },
    { label: "My Profile", href: "/freelancers/settings/profile" },
    { label: "Profile Settings", href: "#" },
    { label: "Withdrawals", href: "#" },
    { label: "My Teams", href: "#" },
    { label: "Connected Services", href: "#" },
    { label: "Password & Security", href: "#" },
    { label: "Identity Verification", href: "#" },
    { label: "Notification Settings", href: "#" },
  ];

  return (
    <FreelancerLayout seo={seo}>
      <div className="flex items-start">
        <div className="w-1/4 space-y-6">
          <h1 className="text-4xl font-semibold">Settings</h1>

          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Billing</h2>
            <ul className="text-sm text-slate-600">
              <li className="border-l border-slate-200 py-2 px-4 hover:text-black">
                <Link href="#" className="">
                  Billing & Payments
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-medium">User Settings</h2>
            <ul className="text-sm text-slate-600">
              {settingNavs.map((nav, index) => (
                <li
                  key={index}
                  className="border-l border-slate-200 py-2 px-4 hover:text-black"
                >
                  <Link href={nav.href} className="">
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 space-y-6">{children}</div>
      </div>
    </FreelancerLayout>
  );
}
