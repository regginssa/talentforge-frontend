import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.provider = account.provider; // google or apple
      }

      if (profile) {
        token.email = profile.email;
        token.firstName = profile.given_name;
        token.lastName = profile.family_name;
        token.picture = profile.picture;

        // Google specific
        token.googleId = profile.sub;

        // Apple may differ (handled later)
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.picture = token.picture;

      session.user.googleId = token.googleId;
      session.user.appleId = token.appleId;

      session.provider = token.provider;

      return session;
    },
  },
});
