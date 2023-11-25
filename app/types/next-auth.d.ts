import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      idToken: string;
      role: string;
    };
  }

  interface User {
    idToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken: string;
    role: string;
  }
}
