import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn-signIn", user);
      console.log("signIn-account", account);
      console.log("signIn-profile", profile);
      console.log("signIn-email", email);
      console.log("signIn-credentials", credentials);
      
      return true;
    },
    async jwt({ token, user, account, profile }) {
      try {
        console.log("jwt-jwt", token);
        console.log("jwt-user", user);
        console.log("jwt-account", account);
        console.log("jwt-profile", profile);
        return token;
      } catch (error) {
        console.error("jwt error", error);
        throw new Error(`jwt error: ${error}`);
      }
    },
    async session({ session, token }) {
      try {
        console.log("session-session", session);
        console.log("session-token", token);
        return session;
      } catch (error: unknown) {
        console.error("session error", error);
        throw new Error(`session error: ${error}`);
      }
    },
    async redirect({ url, baseUrl }) {
      if (url === process.env.NEXT_PUBLIC_MAKETING_WEBSITE_URL) return url;

      // if url is path name, prepend with baseUrl
      // returning it will call the redirect and the returned absoluteUrl will be the URL
      if (url.startsWith('/')) {
        const absoluteUrl = new URL(url, baseUrl).toString();
        return absoluteUrl;
      }

      return url;
    },
  },
}

export default NextAuth(authOptions)