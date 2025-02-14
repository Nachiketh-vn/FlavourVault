import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { Account } from "next-auth";
import { NextApiHandler } from "next";

// Define the authOptions for NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          throw new Error("Authentication failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: unknown;
      account: Account | null;
    }): Promise<unknown | false> {
      if (account?.provider === "google") {
        const { name, email } = user;

        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });

            if (!res.ok) {
              throw new Error("Failed to create user");
            }
          }
        } catch (error) {
          console.log("Google sign-in error: ", error);
          return false; // Ensures that the user doesn't sign in if there's an error
        }
      }

      return user; // Return the user object if sign-in is successful
    },
  },

  session: {
    strategy: "jwt", // Using JWT strategy for session management
  },

  secret: process.env.NEXTAUTH_SECRET!,

  pages: {
    signIn: "/login", // Custom login page
  },
};

// Define handler for the route using NextApiHandler type
const handler: NextApiHandler = (req, res) => {
  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
