import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import authConfig from "./auth.config";
import { cert } from "firebase-admin/app";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
    }),
  }),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [Google, GitHub],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
});
