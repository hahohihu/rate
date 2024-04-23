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
        SELECT id, name, prod_year, watch_date, rating 
        FROM entries 
        ORDER BY watch_date DESC
        LIMIT 50`;

    return data.rows;
}
