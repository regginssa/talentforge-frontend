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
    { label: "Membership", href: "#" },
    { label: "My Profile", href: "#" },
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
          <h1 className="text-3xl font-medium">Settings</h1>

          <div className="space-y-6">
            <h2 className="text-2x font-medium">Billing</h2>
            <ul className="text-sm text-slate-600">
              <li className="border-l border-slate-200 p-2 hover:text-black">
                <Link href="#" className="">
                  Billing & Payments
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2x font-medium">User Settings</h2>
            <ul className="text-sm text-slate-600">
              {settingNavs.map((nav, index) => (
                <li
                  key={index}
                  className="border-l border-slate-200 p-2 hover:text-black"
                >
                  <Link href={nav.href} className="">
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </FreelancerLayout>
  );
}
