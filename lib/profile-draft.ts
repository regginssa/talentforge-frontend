import { UploadedResume } from "./api/profile";

export const PROFILE_DRAFT_KEY = "Worklanc:profile-draft";

export type ProfileDraft = {
  importSource: "resume" | "linkedin" | "manual";
  resume?: UploadedResume;
};

export const getProfileDraft = (): ProfileDraft | null => {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(PROFILE_DRAFT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ProfileDraft;
  } catch {
    return null;
  }
};

export const saveResumeDraft = (resume: UploadedResume) => {
  const draft: ProfileDraft = {
    importSource: "resume",
    resume,
  };
  sessionStorage.setItem(PROFILE_DRAFT_KEY, JSON.stringify(draft));
};

export const clearProfileDraft = () => {
  sessionStorage.removeItem(PROFILE_DRAFT_KEY);
};
