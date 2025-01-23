import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/db";
import Google from "next-auth/providers/google";
import Credential from "next-auth/providers/credentials";
import { loginSchema } from "./zod/types";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credential({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            return null;
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
    Google,
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      if (token && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
