import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { GoalType } from "@/types/user";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/atoms";
import { useRouter } from "next/router";
import { useOnboarding } from "@/hooks/useOnboarding";

const MoneyPack = require("@/public/assets/svgs/icons/other/money_pack.svg");
const Pay = require("@/public/assets/svgs/icons/other/pay.svg");
const Medal = require("@/public/assets/svgs/icons/other/medal.svg");
const Phone = require("@/public/assets/svgs/icons/other/phone_man.svg");

const radios = [
  {
    label: "To earn my main income",
    icon: MoneyPack,
    value: "main_income",
  },
  {
    label: "To make money on the side",
    icon: Pay,
    value: "side_income",
  },
  {
    label: "To get experience, for a full-time job",
    icon: Medal,
    value: "gain_experience",
  },
  {
    label: "I don’t have a goal in mind yet",
    icon: Phone,
    value: "no_goal_yet",
  },
];

export default function Goal() {
  const [goal, setGoal] = useState<GoalType>("gain_experience");
  const router = useRouter();
  const { profile, saveStep, skipStep, saving, skipping } = useOnboarding();
  const seeded = useRef(false);

  useEffect(() => {
    if (!profile || seeded.current) return;
    seeded.current = true;
    if (profile.goal) setGoal(profile.goal);
  }, [profile]);

  return (
    <CreateProfileLayout
      title="Got it. What’s your biggest goal for freelancing?"
      description="Different people come to Upwork for various reasons. We want to highlight the opportunities that fit your goals best while still showing you all the possibilities."
      currentStep={2}
      totalSteps={3}
      seo={{
        title: "Got it. What’s your biggest goal for freelancing?",
        description:
          "Different people come to Upwork for various reasons. We want to highlight the opportunities that fit your goals best while still showing you all the possibilities.",
        url: "/nx/create-profile/goal",
      }}
    >
      <div className="grid grid-cols-4 gap-6">
        {radios.map((r, i) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setGoal(r.value as any)}
          >
            <Card
              key={i}
              className={`hover:bg-slate-100 border ${
                goal === r.value ? "border-black" : "border-slate-100"
              } transition-all duration-200`}
            >
              <CardContent className="rounded-2xl p-4 space-y-4 relative">
                <Image src={r.icon} alt={r.value} width={145} height={130} />
                <p className="text-2xl text-left">{r.label}</p>
                <div
                  className={`absolute top-0 right-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    goal === r.value ? "border-black" : "border-slate-300"
                  }`}
                >
                  <span
                    className={`transition-all duration-200 w-3 h-3 rounded-full bg-black ${
                      goal === r.value ? "scale-100" : "scale-0"
                    }`}
                  ></span>
                </div>
              </CardContent>
            </Card>
          </motion.button>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <div className="flex items-center gap-4">
          <button
            disabled={skipping}
            className="py-2 px-4 text-sm font-medium hover:underline disabled:opacity-50"
            onClick={() => skipStep("/nx/create-profile/work-preference")}
          >
            Skip for now
          </button>

          <Button
            type="primary"
            label="Next"
            loading={saving}
            classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
            onClick={() =>
              saveStep({ goal }, "/nx/create-profile/work-preference")
            }
          />
        </div>
      </div>
    </CreateProfileLayout>
  );
}
