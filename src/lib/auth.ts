import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Name", type: "text", placeholder: "J Smith" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
            },
            async authorize(credentials, req): Promise<any> {
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com", password: '123123' }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.SECRET
}