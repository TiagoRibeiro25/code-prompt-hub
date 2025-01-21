import bcrypt from "bcrypt";
import CredientialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions = {
  sesssion: {
    strategy: "jwt",
  },
  providers: [
    CredientialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
          where: { email },
          include: { user_image: true },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.user_image?.cloudinary_image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};
