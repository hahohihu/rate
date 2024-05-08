import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth }) {
            const loggedIn = !!auth?.user;
            return loggedIn;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
