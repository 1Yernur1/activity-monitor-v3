import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      idToken: string;
      role: string;
    };
  }

  interface User {
    idToken: string;
    localId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    idToken: string;
    role: string;
  }
}
