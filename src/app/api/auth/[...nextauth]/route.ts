import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Kullanıcı Adı", type: "text" },
                password: { label: "Şifre", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Lütfen kullanıcı adı ve şifre girin.");
                }

                const user = await User.findOne({ username: credentials.username });
                if (!user) {
                    throw new Error("Kullanıcı bulunamadı.");
                }

                const isPasswordMatch = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                );

                if (!isPasswordMatch) {
                    throw new Error("Hatalı şifre.");
                }

                return {
                    id: user._id.toString(),
                    name: user.username,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/tr/admin/login", // TR locale varsayılan giriş sayfası yönlendirmesi
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
