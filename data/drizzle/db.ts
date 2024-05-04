import { sql } from '@vercel/postgres';
import postgres from "postgres";
import { drizzle as VercelDrizzle, VercelPgDatabase } from 'drizzle-orm/vercel-postgres';
import { drizzle as JsDrizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from './schema';
import './envConfig';

let db:
    | VercelPgDatabase<typeof schema>
    | PostgresJsDatabase<typeof schema>;;
if (process.env.NODE_ENV === "production") {
    db = VercelDrizzle(sql, { schema });
} else {
    const migrationClient = postgres(process.env.POSTGRES_URL!);
    db = JsDrizzle(migrationClient, { schema });
}

export { db };

