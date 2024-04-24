import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export type Entry = {
    id: number;
    name: string;
    prod_year: number;
    watch_date: Date
    rating: number;
};

export async function fetchMovies() {
    unstable_noStore();

    const data = await sql<Entry>`
        SELECT entries.id, objects.name, objects.prod_year, entries.watch_date, entries.rating 
        FROM entries
        JOIN objects ON objects.id = entries.object_id
        ORDER BY watch_date DESC
        LIMIT 50`;

    return data.rows;
}

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
