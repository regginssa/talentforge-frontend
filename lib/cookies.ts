// Lightweight browser cookie helpers + cookie-consent storage.
//
// Consent model mirrors how Upwork (and most GDPR/CCPA sites) group cookies:
//   - necessary    : always on, can't be disabled (auth, security, load balancing)
//   - performance  : analytics / how the site is used
//   - functional   : remembers preferences (language, saved searches)
//   - advertising  : targeting / measuring ads
export const CONSENT_COOKIE = "worklanc_cookie_consent";
const CONSENT_MAX_AGE_DAYS = 180; // ~6 months, then we ask again

export type CookieCategory =
  | "necessary"
  | "performance"
  | "functional"
  | "advertising";

export interface CookieConsent {
  necessary: true; // locked on
  performance: boolean;
  functional: boolean;
  advertising: boolean;
  decidedAt: string;
}

export const ALL_ACCEPTED: Omit<CookieConsent, "decidedAt"> = {
  necessary: true,
  performance: true,
  functional: true,
  advertising: true,
};

export const ONLY_NECESSARY: Omit<CookieConsent, "decidedAt"> = {
  necessary: true,
  performance: false,
  functional: false,
  advertising: false,
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
};

export const setCookie = (
  name: string,
  value: string,
  maxAgeDays = CONSENT_MAX_AGE_DAYS,
) => {
  if (typeof document === "undefined") return;

  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export const removeCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};

export const getConsent = (): CookieConsent | null => {
  const raw = getCookie(CONSENT_COOKIE);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as CookieConsent;
    return { ...parsed, necessary: true };
  } catch {
    return null;
  }
};

export const saveConsent = (choice: Omit<CookieConsent, "decidedAt">) => {
  const consent: CookieConsent = {
    ...choice,
    necessary: true,
    decidedAt: new Date().toISOString(),
  };
  setCookie(CONSENT_COOKIE, JSON.stringify(consent));
  return consent;
};
