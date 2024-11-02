import { DefaultSession } from "next-auth";
import { AirTUser } from "./user";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    id_token: string;
    airtableUser: AirTUser;
    user: {
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];

  }

  interface User extends DefaultUser {
    jwt?: string
    accessToken?: string
  }
}
