import { Button } from "@/components/atoms";
import { OnboardingLayout } from "@/components/layouts/auth/OnboardingLayout";
import { Icon } from "@iconify/react";

export default function CreateProfile() {
  return (
    <OnboardingLayout>
      <div className="w-[70%] flex items-stretch gap-8">
        <div className="flex-1 flex flex-col justify-between">
          <h3 className="text-3xl">
            Hey John. Ready for your next big opportunity?
          </h3>

          <ul className="text-slate-900 text-sm">
            <li className="flex items-center gap-6 py-8 border-b border-slate-300">
              <Icon
                icon="material-symbols-light:account-circle-outline"
                width={32}
              />
              <p>Answer a few questions and start building your profile</p>
            </li>
            <li className="flex items-center gap-6 py-8 border-b border-slate-300">
              <Icon
                icon="material-symbols-light:hand-package-outline"
                width={32}
              />
              <p>Apply for open roles or list services for clients to buy</p>
            </li>
            <li className="flex items-center gap-6 py-8 border-b border-slate-300">
              <Icon
                icon="material-symbols-light:money-bag-outline"
                width={32}
              />
              <p>Get paid safely and know we’re there to help</p>
            </li>
          </ul>
          <div className="mt-8 flex items-center justify-between gap-8">
            <Button
              type="primary"
              label="Get started"
              classname="font-semibold! text-sm! rounded-full! py-3! px-5!"
            />
            <p className="text-sm text-slate-600">
              It only takes 5-10 minutes and you can edit it later. We’ll save
              as you go.
            </p>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>
    </OnboardingLayout>
  );
}
