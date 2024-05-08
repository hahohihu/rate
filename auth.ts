import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import google from 'next-auth/providers/google';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    // This is constrained since I've only configured my own email for this client
    providers: [google],
});
