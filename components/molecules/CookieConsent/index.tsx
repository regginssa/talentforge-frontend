import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/atoms";
import { Switch } from "@/components/ui/switch";
import {
  ALL_ACCEPTED,
  ONLY_NECESSARY,
  getConsent,
  saveConsent,
  type CookieConsent as Consent,
} from "@/lib/cookies";

type Selectable = Omit<Consent, "decidedAt" | "necessary">;

const CATEGORIES: {
  key: keyof Selectable;
  title: string;
  description: string;
}[] = [
  {
    key: "performance",
    title: "Performance cookies",
    description:
      "Help us understand how visitors use Worklanc so we can measure and improve performance.",
  },
  {
    key: "functional",
    title: "Functional cookies",
    description:
      "Remember choices you make (such as language or region) to give you a more personalized experience.",
  },
  {
    key: "advertising",
    title: "Advertising cookies",
    description:
      "Used to deliver relevant ads and measure the effectiveness of advertising campaigns.",
  },
];

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [choice, setChoice] = useState<Selectable>({
    performance: false,
    functional: false,
    advertising: false,
  });

  // Open on first visit (no decision cookie yet). Runs after mount to avoid
  // SSR/hydration mismatches.
  useEffect(() => {
    if (!getConsent()) setOpen(true);
  }, []);

  const decide = (selection: Selectable) => {
    saveConsent({ ...selection, necessary: true });
    setOpen(false);
    setCustomizing(false);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="relative w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-8 m-0 sm:m-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-medium">Your privacy choices</h2>
          <p className="mt-3 text-sm text-slate-600">
            We use cookies to keep Worklanc secure, understand how it's used,
            and improve your experience. You can accept all, reject
            non-essential cookies, or choose what to allow. Read our{" "}
            <Link href="#" className="text-blue-600 underline">
              Cookie Policy
            </Link>
            .
          </p>

          {customizing && (
            <ul className="mt-6 space-y-5 max-h-[40vh] overflow-y-auto pr-1  no-scrollbar">
              <li className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium">
                    Strictly necessary cookies
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Required for the site to work (sign in, security). These are
                    always on.
                  </p>
                </div>
                <Switch checked disabled className="mt-1" />
              </li>

              {CATEGORIES.map((category) => (
                <li
                  key={category.key}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="text-sm font-medium">{category.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {category.description}
                    </p>
                  </div>
                  <Switch
                    checked={choice[category.key]}
                    onCheckedChange={(value) =>
                      setChoice((prev) => ({ ...prev, [category.key]: value }))
                    }
                    className="mt-1"
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {customizing ? (
              <Button
                type="primary"
                label="Save my choices"
                size="medium"
                classname="rounded-full! text-sm! font-medium! py-2! px-5!"
                onClick={() => decide(choice)}
              />
            ) : (
              <>
                <Button
                  type="primary"
                  label="Accept all"
                  size="medium"
                  classname="rounded-full! text-sm! font-medium! py-2! px-5!"
                  onClick={() => decide(ALL_ACCEPTED)}
                />
                <Button
                  type="outline"
                  label="Reject non-essential"
                  size="medium"
                  classname="rounded-full! text-sm! font-medium! py-2! px-5!"
                  onClick={() => decide(ONLY_NECESSARY)}
                />
              </>
            )}

            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:underline cursor-pointer px-2 py-2"
              onClick={() => setCustomizing((prev) => !prev)}
            >
              {customizing ? "Back" : "Customize"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CookieConsent;
