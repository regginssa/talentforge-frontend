import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchMe, setStatus } from "@/store/slices/userSlice";
import { getAuthToken } from "@/lib/api/auth";

// Runs once on app load: if a token is stored, hydrate the user from /me;
// otherwise mark the session unauthenticated. Non-redirecting on purpose —
// public marketing pages must stay reachable. Route protection is opt-in via
// the useRequireAuth / useOnboardingGuard hooks.
export default function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(fetchMe());
    } else {
      dispatch(setStatus("unauthenticated"));
    }
  }, [dispatch]);

  return null;
}
