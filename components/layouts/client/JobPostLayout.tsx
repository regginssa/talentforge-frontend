import { TSEO } from "@/types/components.types";
import { ClientLayout } from "..";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { Button } from "@/components/atoms";

interface JobPostLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
  step: number;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export default function JobPostLayout({
  children,
  seo,
  step,
  onNext,
  onBack,
  nextDisabled,
  nextLabel,
}: JobPostLayoutProps) {
  return (
    <ClientLayout seo={seo}>
      <div className="max-w-4xl w-full mx-auto">
        <div className="space-y-2 mb-10">
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-600">{step} of 6</p>
            <h1 className="text-sm">Job post</h1>
          </div>

          <Progress value={(step / 6) * 100} />
        </div>

        {children}

        {(onNext || onBack) && (
          <div className="mt-20 flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="py-2 px-4 cursor-pointer transition-colors duration-200 hover:bg-slate-50 rounded-full text-sm border border-slate-400"
              onClick={onBack}
            >
              Back
            </motion.button>
            <Button
              type="primary"
              label={nextLabel}
              disabled={!!nextDisabled}
              classname="py-2! px-4! text-sm! font-medium! rounded-full!"
              onClick={onNext}
            />
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
