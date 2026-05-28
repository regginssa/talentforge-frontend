import { FreelancerSettingsLayout } from "@/components/layouts";
import EmptyTeamsIcon from "@/public/assets/svgs/icons/other/empty_teams.svg";
import Image from "next/image";

export default function Teams() {
  return (
    <FreelancerSettingsLayout
      seo={{
        title: "Teams - Worklanc",
        description: "Teams - Worklanc",
        url: "/freelancers/settings/teams",
      }}
    >
      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div>
          <h3 className="text-2xl font-medium">My teams</h3>
          <p className="mt-1 text-slate-600 text-sm">
            Teams are used to group contract by department or manager
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            src={EmptyTeamsIcon}
            alt="Empty teams"
            className="w-[145px] h-[130px] object-contain"
          />
          <p className="">There are no teams</p>
        </div>
      </div>
    </FreelancerSettingsLayout>
  );
}
