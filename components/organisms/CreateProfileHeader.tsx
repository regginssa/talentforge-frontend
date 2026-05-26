import { useEffect, useRef, useState } from "react";
import { WorkLancLogo } from "../atoms";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";

export default function CreateProfileHeader({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <header className="w-full max-w-[80%] mx-auto p-6 flex items-center justify-between bg-white">
      <WorkLancLogo />
      <div className="relative">
        <button className="cursor-pointer" onClick={() => setOpen(true)}>
          <Icon
            icon="material-symbols-light:account-circle-outline"
            width={32}
          />

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute bg-white top-full w-[240px] right-0 max-h-72 overflow-y-auto z-40 mt-1 shadow-md p-1 rounded-lg border border-slate-200 flex flex-col"
              >
                <div className="flex flex-col items-center justify-center pt-6 pb-4">
                  <Icon
                    icon="material-symbols-light:account-circle-outline"
                    width={100}
                  />
                  <div className="mt-2">
                    <h3 className="">Jhon Smthi</h3>
                    <p className="text-xs text-slate-600">Freelancer</p>
                  </div>
                </div>

                <div>
                  <button className="py-2 px-4 transition-all duration-200 hover:bg-slate-200 cursor-pointer w-full rounded-md flex items-center gap-4">
                    <Icon
                      icon="material-symbols-light:settings-outline"
                      width={24}
                    />
                    <span className="text-xs">Close account</span>
                  </button>
                  <button className="py-2 px-4 transition-all duration-200 hover:bg-slate-200 cursor-pointer w-full rounded-md flex items-center gap-4">
                    <Icon icon="material-symbols-light:logout" width={24} />
                    <span className="text-xs">Log out</span>
                  </button>
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
}
