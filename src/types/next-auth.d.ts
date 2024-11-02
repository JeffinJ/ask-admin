import { DefaultSession } from "next-auth";
import { MBUser } from "./auth/session.types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    id_token: string;
    user: {
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
    mbUser: MBUser;
  }

  interface User extends DefaultUser {
    jwt?: string
    accessToken?: string
  }
}
