import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TalentAPI, { type TalentProfilePatch } from "@/lib/api/talent";
import type { Account, TalentProfile } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const FINISH_PATH = "/nx/create-profile/finish";

// Shared onboarding helper: loads the talent profile (for seeding forms) and
// persists each step before navigating, keeping the account's onboarding step
// in sync (in the DB and in Redux for resume logic).
export const useOnboarding = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);
  const [saving, setSaving] = useState(false);
  const [skipping, setSkipping] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["talent-profile"],
    queryFn: TalentAPI.getProfile,
  });

  const profile: TalentProfile | null = data?.profile ?? null;

  // Keep the cached profile in sync with the PATCH response so navigating back
  // immediately shows the freshly saved values.
  const cacheProfile = (res: any) => {
    if (!res?.profile) return;
    queryClient.setQueryData(["talent-profile"], {
      profile: res.profile,
      account: res.account ?? null,
    });
  };

  const syncAccount = (account?: Account) => {
    if (!user || !account) return;
    dispatch(
      setUser({
        ...user,
        accounts: user.accounts.map((existing) =>
          existing.id === account.id ? { ...existing, ...account } : existing,
        ),
      }),
    );
  };

  const saveStep = async (patch: TalentProfilePatch, nextPath: string) => {
    setSaving(true);
    try {
      const res = await TalentAPI.updateProfile({
        ...patch,
        onboardingStep: nextPath,
      });
      cacheProfile(res);
      if (res?.account) syncAccount(res.account);
      router.push(nextPath);
      return res;
    } finally {
      setSaving(false);
    }
  };

  // Advance to the next step without saving this step's form data (the
  // onboarding step still moves so "resume" lands the user in the right place).
  const skipStep = async (nextPath: string) => {
    setSkipping(true);
    try {
      const res = await TalentAPI.updateProfile({ onboardingStep: nextPath });
      cacheProfile(res);
      if (res?.account) syncAccount(res.account);
      router.push(nextPath);
      return res;
    } finally {
      setSkipping(false);
    }
  };

  const complete = async (nextPath: string = FINISH_PATH) => {
    setSaving(true);
    try {
      const res = await TalentAPI.updateProfile({ onboardingCompleted: true });
      cacheProfile(res);
      if (res?.account) syncAccount(res.account);
      router.push(nextPath);
      return res;
    } finally {
      setSaving(false);
    }
  };

  return {
    profile,
    loadingProfile: isLoading,
    saving,
    skipping,
    saveStep,
    skipStep,
    complete,
  };
};
