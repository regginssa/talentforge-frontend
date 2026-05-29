import type { OAuthProvider } from "@/types/oauth";

// In-place social sign-in. Both providers use a popup (no full-page redirect to
// a separate callback route). Each returns a normalized profile that the
// backend /auth/oauth route understands.
export interface SocialProfile {
  provider: OAuthProvider;
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

declare global {
  interface Window {
    google?: any;
    AppleID?: any;
  }
}

const loadScript = (src: string, id: string) =>
  new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") return reject(new Error("no-document"));

    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error(`Failed to load ${src}`)),
      );
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

// Decode a JWT payload (no signature verification — that happens on the backend).
const decodeJwt = (token: string): Record<string, any> => {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return {};
  }
};

export const googleSignIn = async (): Promise<SocialProfile> => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error("Google client id is not configured");

  await loadScript("https://accounts.google.com/gsi/client", "gis-client");

  return new Promise<SocialProfile>((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (response: any) => {
        if (response.error) return reject(new Error(response.error));

        try {
          const info = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${response.access_token}` } },
          ).then((res) => res.json());

          resolve({
            provider: "google",
            providerId: info.sub,
            email: info.email,
            firstName: info.given_name,
            lastName: info.family_name,
          });
        } catch (error) {
          reject(error);
        }
      },
    });

    client.requestAccessToken();
  });
};

export const appleSignIn = async (): Promise<SocialProfile> => {
  const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
  if (!clientId) throw new Error("Apple client id is not configured");

  await loadScript(
    "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
    "appleid-client",
  );

  window.AppleID.auth.init({
    clientId,
    scope: "name email",
    redirectURI: process.env.NEXT_PUBLIC_APP_URL,
    usePopup: true,
  });

  const response = await window.AppleID.auth.signIn();
  const claims = decodeJwt(response?.authorization?.id_token || "");

  return {
    provider: "apple",
    providerId: claims.sub,
    // Apple only returns name/email on the very first authorization.
    email: response?.user?.email || claims.email,
    firstName: response?.user?.name?.firstName,
    lastName: response?.user?.name?.lastName,
  };
};

export const signInWithProvider = (provider: OAuthProvider) =>
  provider === "google" ? googleSignIn() : appleSignIn();
