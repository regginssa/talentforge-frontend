import { Button } from "@/components/atoms";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import Link from "next/link";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import Image from "next/image";
import { FreelancerLayout } from "@/components/layouts";

export default function ChangePlan() {
  const freelancers = [
    {
      avatar: UserPic,
      name: "Rajeev M.",
      memberSince: 2019,
      text: "“You need Connects to bid anyway, and Freelancer Plus makes it simple. It gives me plenty of Connects plus extra premium benefits, making it a worthwhile monthly investment.”",
    },
    {
      avatar: UserPic,
      name: "Nandini K.",
      memberSince: 2024,
      text: "“I upgraded to Freelancer Plus because I wanted more opportunities and projects. The extra perks made it easier to get noticed and connect with clients.”",
    },
    {
      avatar: UserPic,
      name: "Abel A.",
      memberSince: 2024,
      text: "“I upgraded to Freelancer Plus in my first month on Worklanc because I wanted access to insights, like average bid prices and the number of freelancers applying. Those tools make it much easier to know how to position myself competitively.”",
    },
  ];

  return (
    <FreelancerLayout
      seo={{
        title: "Change Membership Plan - Worklanc",
        description: "Membership plans",
        url: "https://Worklanc.com/nx/plans/membership/change-plan",
      }}
    >
      <Link
        href="#"
        className="flex items-center gap-2 text-blue-600 text-sm font-medium"
      >
        <Icon
          icon="material-symbols-light:arrow-left-alt"
          className="w-5 h-5"
        />
        <span>Back</span>
      </Link>

      <h1 className="text-4xl font-semibold">Membership plans</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="border border-slate-200 p-8 rounded-3xl space-y-6">
          <h2 className="text-3xl font-medium">Basic</h2>
          <p className="text-sm">Free</p>
          <p className="text-sm text-slate-600">
            Essential features to build your freelance career
          </p>
          <Button
            type="primary"
            label="Current plan"
            classname="py-2.5! px-5! text-sm! font-medium! rounded-full!"
            disabled
          />
          <div className="bg-slate-200 h-[1px] w-full"></div>
          <ul className="space-y-2 list-inside list-disc text-sm">
            <li>5% service fee on Direct Contracts</li>
            <li>Limited access to Uma</li>
            <li>
              <span className="inline-flex items-center gap-1">
                <span>10 Connects per month</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icon
                      icon="material-symbols-light:info-outline"
                      className="w-4 h-4"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm p-2">
                      Earn 10 Connects by completing tasks that help you find
                      work.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </li>
          </ul>
        </div>

        <div className="border-2 border-blue-300 p-8 rounded-3xl space-y-6 relative">
          <div className="absolute py-1.5 px-4 rounded-bl-2xl bg-blue-300 text-sm top-0 right-0 rounded-tr-2xl">
            <span className="uppercase font-medium">Popular</span>
          </div>

          <h2 className="text-3xl font-medium">Plus</h2>
          <p className="text-sm font-medium">
            <span className="line-through">$19.99 per month*</span> Try one
            month for $9.99
          </p>
          <p className="text-sm text-slate-600">
            Win more work with competitive tools
          </p>
          <Button
            type="primary"
            label="Upgrade"
            classname="py-2.5! px-5! text-sm! font-medium! rounded-full!"
          />
          <div className="bg-slate-200 h-[1px] w-full"></div>
          <ul className="space-y-2 list-inside list-disc text-sm">
            <li>
              <span className="inline-flex items-center gap-1">
                <span>0% service fee on Direct Contracts</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icon
                      icon="material-symbols-light:info-outline"
                      className="w-4 h-4"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm p-2">
                      Receive a reduced service fee, simplify contract
                      management, and build your reputation when you bring new
                      clients to Worklanc with Direct Contracts.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </li>

            <li>
              <span className="inline-flex items-center gap-1">
                <span>Unlimited access to Uma</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icon
                      icon="material-symbols-light:info-outline"
                      className="w-4 h-4"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm p-2">
                      Get unlimited assistance from Uma, Worklanc's Mindful AI,
                      built into your everyday workflow to help boost your
                      productivity.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </li>

            <li>100 Connects per month</li>
            <li>Personalized job alerts</li>
            <li>Proposal insights</li>
            <li>Custom profile URL</li>
            <li>Always-active profile</li>
            <li>Private earnings setting</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl">
        <div className="flex flex-col items-center justify-center mt-8">
          <h2 className="text-3xl font-medium">
            Why 100,000+ freelancers choose Plus
          </h2>
          <p className="text-sm mt-2">
            Members typically see these results within 30 days
          </p>

          <div className="flex items-center justify-center mt-10">
            <div className="px-8 py-2 flex flex-col items-center justify-center gap-2 border-r-2 border-slate-300">
              <span className="text-2xl font-medium">+ 40%</span>
              <span className="text-sm">More contracts</span>
              <p className="text-sm text-slate-600">
                Connect with more jobs to win more work
              </p>
            </div>
            <div className="px-8 py-2 flex flex-col items-center justify-center gap-2 border-r-2 border-slate-300">
              <span className="text-2xl font-medium">+ 40%</span>
              <span className="text-sm">More contracts</span>
              <p className="text-sm text-slate-600">
                Connect with more jobs to win more work
              </p>
            </div>
            <div className="px-8 py-2 flex flex-col items-center justify-center gap-2 border-r-2 border-slate-300">
              <span className="text-2xl font-medium">+ 40%</span>
              <span className="text-sm">More contracts</span>
              <p className="text-sm text-slate-600">
                Connect with more jobs to win more work
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 mt-16">
            <h3 className="text-xl font-medium">
              Trusted by Top Rated freelancers
            </h3>

            <div className="flex items-stretch gap-6">
              {freelancers.map((freelancer, index) => (
                <div
                  key={index}
                  className="border flex-1 border-slate-300 rounded-3xl p-8 flex flex-col items-start justify-between space-y-10"
                >
                  <p className="text-sm text-slate-900">{freelancer.text}</p>

                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs">
                      <h3>{freelancer.name}</h3>
                      <p>Member since {freelancer.memberSince}</p>
                    </div>

                    <div className="relative w-12 h-12 rounded-full">
                      <Image
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}
