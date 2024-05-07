import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

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
