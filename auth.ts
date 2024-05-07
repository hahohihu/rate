import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [credentials({
        async authorize(credentials) {
            const creds = z
                .object({ password: z.string() })
                .safeParse(credentials);
            if (creds.data?.password == process.env.ADMIN_PASSWORD) {
                return { id: "admin", name: "admin" };
            } else {
                return null;
            }
        }
    })],
});
