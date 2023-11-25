import { singInWithEmailAndPassword } from "@/app/auth/service/fetcher";
import { TokenClaimsModel } from "@/app/model/TokenClaimsModel";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials.password) {
          const { email, password } = credentials;
          const res = await singInWithEmailAndPassword(email, password);
          const user = await res.json();
          if (res.ok && user) {
            return user;
          }
          return new Error();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const decodedToken: TokenClaimsModel = await jwtDecode(user.idToken);
        token.role =decodedToken.custom_claims ? decodedToken.custom_claims[0] : "";
        token.idToken = user.idToken;
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user.idToken = token.idToken;
      session.user.role = token.role;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
