import { Button, Textarea } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { useEffect, useRef, useState } from "react";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import Image from "next/image";
import { Icon } from "@iconify/react";
import TOP_RATED_PLUS from "@/public/assets/svgs/icons/badges/top_rated_plus.svg";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function Overview() {
  const [overview, setOverview] = useState("");
  const router = useRouter();
  const { profile, saveStep, saving } = useOnboarding();
  const seeded = useRef(false);

  useEffect(() => {
    if (!profile || seeded.current) return;
    seeded.current = true;
    if (profile.overview) setOverview(profile.overview);
  }, [profile]);

  return (
    <CreateProfileLayout
      title="Great. Now write a bio to tell the world about yourself."
      description="Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points. You can always edit later; just make sure you proofread now."
      currentStep={8}
      totalSteps={10}
      seo={{
        title: "Great. Now write a bio to tell the world about yourself.",
        description:
          "Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points. You can always edit later; just make sure you proofread now.",
        url: "/nx/create-profile/overview",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="w-[60%]">
          <Textarea
            name="overview"
            value={overview}
            placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
            rows={10}
            onChange={(e) => setOverview(e.target.value)}
          />
          <p className="text-xs text-slate-600 text-right mt-1">
            At least 100 characters
          </p>
        </div>
        <div className="w-[30%] border border-slate-600 rounded-2xl p-6 flex flex-col items-center gap-4">
          <div className="relative w-[128px] h-[128px]">
            <Image
              src={UserPic}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />

            <div className="w-6 h-6 bg-green-600 rounded-full absolute top-1 left-1 border-4 border-white"></div>
          </div>

          <h3 className="text-3xl font-medium">Marti G.</h3>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Image
                src={TOP_RATED_PLUS}
                alt="Top rated plus"
                width={24}
                height={24}
              />
              <span>5.0</span>
            </div>
            <span>$65.00/hr</span>
            <div className="flex items-center gap-2">
              <Icon
                icon="material-symbols-light:checked-bag-outline-rounded"
                width={32}
              />
              <span>14 jobs</span>
            </div>
          </div>

          <div className="text-sm space-y-2">
            <p>
              I’m a developer experienced in building websites for small and
              medium-sized businesses. Whether you’re trying to win work, list
              your services, or create a new online store, I can help.
            </p>

            <div className="pl-4">
              <ul className="list-disc space-y-2">
                <li>Knows HTML and CSS3, PHP, jQuery, Wordpress, and SEO</li>
                <li>Full project management from start to finish</li>
                <li>
                  Regular communication is important to me, so let’s keep in
                  touch.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, set your rate"
          loading={saving}
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() =>
            saveStep({ overview }, "/nx/create-profile/rate")
          }
        />
      </div>
    </CreateProfileLayout>
  );
}
