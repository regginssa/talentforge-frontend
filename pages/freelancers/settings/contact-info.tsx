import { Button, IconButton } from "@/components/atoms";
import { FreelancerSettingsLayout } from "@/components/layouts";
import { motion } from "motion/react";

export default function ContactInfo() {
  return (
    <FreelancerSettingsLayout
      seo={{
        title: "Contact Info - Worklanc",
        description: "Contact Info - Worklanc",
        url: "/freelancers/settings/contact-info",
      }}
    >
      <h2 className="text-3xl font-medium">Contact Info</h2>
      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium">Account</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <ul className="space-y-4">
          <li className="space-y-2">
            <p>User ID</p>
            <p>319ed440ff82058c</p>
          </li>

          <li className="space-y-2">
            <p>Name</p>
            <p>Marco Newer</p>
          </li>

          <li className="space-y-2">
            <p>Email</p>
            <p>n******co@gmail.com</p>
          </li>
        </ul>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 font-medium cursor-pointer hover:underline"
        >
          <span>Close my account</span>
        </motion.button>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="">
          <h3 className="text-2xl font-medium">Additional accounts</h3>
          <p className="mt-1 text-sm text-slate-600">
            Creating a new account allows you to use Upwork in different ways,
            while still having just one login.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg">Client Account</h4>
            <p className="text-sm text-slate-600">
              Hire, manage and pay as a different company. Each client company
              has its own freelancers, payment methods and reports.
            </p>
          </div>

          <Button
            type="outline"
            label="New Client Account"
            size="medium"
            classname="py-2.5! px-5! font-medium! text-sm! rounded-md!"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg">Agency Account</h4>
            <p className="text-sm text-slate-600">
              Find jobs and earn money as manager of a team of freelancers.
            </p>
          </div>

          <Button
            type="outline"
            label="New Agency Account"
            size="medium"
            classname="py-2.5! px-5! font-medium! text-sm! rounded-md!"
          />
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium">Location</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="">
          <h4 className="text-lg">Timezone</h4>
          <p className="text-sm text-slate-600 mt-1">
            UTC+01:00 (Coordinated Universal Time) Dublin, Edinburgh, London
          </p>
        </div>

        <div className="">
          <h4 className="text-lg">Address</h4>
          <p className="text-sm text-slate-600 mt-1">67 Saint John's Hill</p>
          <p className="text-sm text-slate-600 mt-1">United Kingdom</p>
          <p className="text-sm text-slate-600 mt-1">67 Saint John's Hill</p>
        </div>

        <div className="">
          <h4 className="text-lg">Phone</h4>
          <p className="text-sm text-slate-600 mt-1">+44 7458038425</p>
        </div>
      </div>
    </FreelancerSettingsLayout>
  );
}
