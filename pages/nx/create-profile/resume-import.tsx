import { Button } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import Image from "next/image";
import ResumeImportImage from "@/public/assets/webps/avatars/resume-import.webp";
import { motion } from "motion/react";
import { useRouter } from "next/router";

export default function ResumeImport() {
  const router = useRouter();

  return (
    <CreateProfileLayout
      title="How would you like to tell us about yourself?"
      description="We need to get a sense of your education, experience and skills. It’s quickest to import your information — you can edit it before your profile goes live."
      currentStep={1}
      totalSteps={10}
      seo={{
        title: "How would you like to tell us about yourself?",
        description:
          "We need to get a sense of your education, experience and skills. It’s quickest to import your information — you can edit it before your profile goes live.",
        url: "/nx/create-profile/resume-import",
      }}
    >
      <div className="flex items-start my-10">
        <div className="flex-1 space-y-4">
          <Button
            type="outline"
            size="medium"
            label="Import from LinkedIn"
            icon="mdi:linkedin"
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
          />
          <Button
            type="outline"
            size="medium"
            label="Upload your resume"
            icon="mdi:upload-outline"
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
          />
          <Button
            type="outline"
            size="medium"
            label="Fill out manually (15 min)"
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
          />
        </div>
        <div className="flex-1"></div>
        <div className="flex-1 rounded-2xl bg-slate-100 p-6">
          <Image
            src={ResumeImportImage}
            alt="Avatar"
            className="w-[60px] h-[60px] object-cover rounded-full"
          />

          <p className="text-xl mt-6">
            “Your WorkLanc profile is how you stand out from the crowd.It’s what
            you use to win work, so let’s make it a good one.”
          </p>
          <p className="text-slate-800 text-sm mt-1">WorkLanc Pro Tip</p>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="py-2 px-4 rounded-full text-sm border border-slate-400"
        onClick={() => router.back()}
      >
        Back
      </motion.button>
    </CreateProfileLayout>
  );
}
