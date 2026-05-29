import { request } from "./client";
import type { TalentProfile, LanguageLevel } from "@/types/user";

// Flattened wire shapes the backend expects (children are sent as plain arrays
// the controller maps onto its child tables).
export interface EmploymentInput {
  title: string;
  company: string;
  city?: string;
  country?: string;
  startedAt?: Date | string | null;
  endAt?: Date | string | null;
  isCurrent?: boolean;
  description?: string;
}

export interface EducationInput {
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startedYear?: number | null;
  endYear?: number | null;
  description?: string;
}

export interface LanguageInput {
  name: string;
  level: LanguageLevel;
}

// Patch payload for an onboarding step: any subset of profile scalar fields,
// plus children and the onboarding-progress controls handled on the account.
export type TalentProfilePatch = Partial<
  Pick<
    TalentProfile,
    | "title"
    | "overview"
    | "hourlyRate"
    | "experienceLevel"
    | "goal"
    | "workPreference"
    | "visibility"
    | "projectPreference"
    | "photoUrl"
    | "importSource"
  >
> & {
  categorySlug?: string | null;
  specialties?: string[];
  skills?: { name: string; skillId?: number }[] | string[];
  employment?: EmploymentInput[];
  education?: EducationInput[];
  languages?: LanguageInput[];
  onboardingStep?: string | null;
  onboardingCompleted?: boolean;
};

const TalentAPI = {
  getProfile: async () => await request("/talent/profile", { method: "GET" }),

  updateProfile: async (body: TalentProfilePatch) =>
    await request("/talent/profile", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};

export default TalentAPI;
