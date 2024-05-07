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
            // Best practice is to hash this, but here it's my own randomly generated password
            // that I don't use anywhere else, and if they've compromised my .env file, I'm already pwned
            if (creds.data?.password == process.env.ADMIN_PASSWORD) {
                return { id: "admin", name: "admin" };
            } else {
                return null;
            }
        }
    })],
});
