import type { AccountType } from "@/types/user";

export type { AccountType };

// Whether the social flow is being used to create a new account or sign in.
export type AuthIntent = "signup" | "login";

export type OAuthProvider = "google" | "apple";

// Decoded social profile the frontend posts to the backend /auth/oauth route.
export interface OAuthProfile {
  provider: OAuthProvider;
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  intent?: AuthIntent;
  accountType?: AccountType;
  countryCode?: string;
}
