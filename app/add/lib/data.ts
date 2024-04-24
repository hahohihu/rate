import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export type DbObject = {
    id: number;
    name: string;
    prod_year: number;
};

export async function fetchObjects(query: string) {
    unstable_noStore();

    const data = await sql<DbObject>`
        SELECT id, name, prod_year
        FROM objects
        WHERE name ILIKE ${`%${query}%`}
        LIMIT 25;
    `;

    return data.rows;
}

export async function getObject(id: number) {
    const data = await sql<DbObject>`
        SELECT id, name, prod_year
        FROM objects
        WHERE id = ${id}
    `;

    return data.rows[0];
}
