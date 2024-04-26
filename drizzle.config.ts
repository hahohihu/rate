import '@/data/drizzle/envConfig';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './data/drizzle/schema.ts',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL!,
    },
});
