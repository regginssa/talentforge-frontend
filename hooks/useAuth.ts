import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

const LOGIN_PATH = "/nx/login";
const SIGNUP_PATH = "/nx/signup";
const DASHBOARD_PATH = "/dashboard";

// Protect a page: once the session has been resolved, send unauthenticated
// users to the login page. Returns the current auth status so callers can show
// a loader while it's still "idle" / "loading".
export const useRequireAuth = () => {
  const { status } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(LOGIN_PATH);
    }
  }, [status, router]);

  return status;
};

// Guard the talent onboarding flow:
//   - not signed in           -> login
//   - no talent account       -> signup (must choose talent first)
//   - onboarding completed     -> dashboard
// (Resuming at the exact incomplete step is handled once onboarding data is
// persisted — see item 3.)
export const useOnboardingGuard = () => {
  const status = useRequireAuth();
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated" || !user) return;

    const talent = user.accounts.find((account) => account.type === "talent");

    if (!talent) {
      router.replace(SIGNUP_PATH);
      return;
    }

    if (talent.onboardingCompleted) {
      router.replace(DASHBOARD_PATH);
    }
  }, [status, user, router]);

  return status;
};
