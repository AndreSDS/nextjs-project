import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Name", type: "text", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "text", placeholder: "jsmith" },
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
    ]
}