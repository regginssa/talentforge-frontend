import { Button } from "@/components/atoms";
import { OnboardingLayout } from "@/components/layouts/auth/OnboardingLayout";
import { Icon } from "@iconify/react";
import Link from "next/link";

const PleaseVerify = () => {
  return (
    <OnboardingLayout>
      <Icon icon="material-symbols-light:mail-shield-outline" width={120} />
      <div className="flex flex-col items-center justify-center mt-8 gap-8">
        <h3 className="text-lg">Verify your email to continue</h3>
        <div className="text-sm text-slate-600 text-center">
          <p>We just sent an email to the address: owner@charlieunicornai.eu</p>
          <p>
            Please check your email and select the link provided to verify your
            address
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            label="Send again"
            classname="font-semibold! rounded-full! text-sm!"
          />
        </div>
        <Link href="#" className="text-sm underline">
          Didn't receive email?
        </Link>
      </div>
    </OnboardingLayout>
  );
};

export default PleaseVerify;
