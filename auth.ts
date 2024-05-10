import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import google from 'next-auth/providers/google';
import credentials from 'next-auth/providers/credentials';
import { Provider } from 'next-auth/providers';
import '@/data/drizzle/envConfig';

let providers: Provider[] = [];

if (process.env.BYPASS_AUTH) {
    providers.push(credentials({
        async authorize() {
            return {
                name: "admin"
            }
        }
    }))
} else {
    providers.push(google);
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    // This is constrained since I've only configured my own email for this client
    providers,
});
