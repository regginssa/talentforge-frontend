import { Button } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import ProfileAPI from "@/lib/api/profile";
import { getProfileDraft, saveResumeDraft } from "@/lib/profile-draft";
import ResumeImportImage from "@/public/assets/webps/avatars/resume-import.webp";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ResumeImport() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    const draft = getProfileDraft();
    if (draft?.resume?.fileName) {
      setUploadedFileName(draft.resume.fileName);
    }
  }, []);

  const validateFile = (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    const typeOk =
      ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext);

    if (!typeOk) {
      toast.error("Please upload a PDF, DOC, or DOCX file");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File must be 5MB or smaller");
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file || !validateFile(file)) return;

    setUploading(true);

    try {
      const data = await ProfileAPI.uploadResume(file);

      if (!data?.resume) return;

      saveResumeDraft(data.resume);
      setUploadedFileName(data.resume.fileName);
      toast.success("Resume uploaded successfully");
    } finally {
      setUploading(false);
    }
  };

  const openFilePicker = () => {
    if (!uploading) fileInputRef.current?.click();
  };

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
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

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
            label={uploadedFileName ? "Replace resume" : "Upload your resume"}
            icon={
              uploadedFileName
                ? "mdi:check-circle-outline"
                : "mdi:file-upload-outline"
            }
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
            loading={uploading}
            disabled={uploading}
            onClick={openFilePicker}
          />
          <Button
            type="outline"
            size="medium"
            label="Fill out manually (15 min)"
            classname="font-medium! text-sm! py-2.5! w-full! rounded-full!"
          />

          {uploadedFileName && !uploading && (
            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              <Icon icon="mdi:file-document-outline" width={20} />
              <span className="truncate">{uploadedFileName}</span>
            </div>
          )}

          <p className="text-xs text-slate-500">
            Supported formats: PDF, DOC, DOCX (max 5MB)
          </p>
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

      <div className="flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        {uploadedFileName && (
          <Button
            type="primary"
            size="medium"
            label="Continue"
            classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
            onClick={() => {
              // Next profile steps will read from sessionStorage draft
              toast.info("Resume saved — profile mapping coming next");
            }}
          />
        )}
      </div>
    </CreateProfileLayout>
  );
}
