import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { EntryInsert, ThingInsert, entries, things } from './schema';

const db = drizzle(sql);

function createEntry(name: string, watch_date: Date, prod_year: number, rating: number): EntryInsert & ThingInsert {
    return {
        name,
        watch_date,
        prod_year,
        rating
    };
}

const movies = [
    createEntry('National Theatre Live: Fleabag', new Date(2024, 3, 21), 2019, 2.5),
    createEntry('Z', new Date(2024, 3, 7), 1969, 1.5),
    createEntry('Ice Merchants', new Date(2024, 3, 5), 2022, 1.2),
    createEntry('Gods of Egypt', new Date(2024, 3, 5), 2016, 0.5),
    createEntry('A Short Film About Killing', new Date(2024, 3, 5), 1988, 1.6),
    createEntry('Madame Web', new Date(2024, 3, 4), 2024, 0.8),
    createEntry('Injustice', new Date(2024, 2, 30), 2021, 0),
    createEntry('The Devil in Miss Jones', new Date(2024, 2, 22), 1973, -0.5),
    createEntry('Big Trouble in Little China', new Date(2024, 2, 22), 1986, -0.5),
    createEntry('Prelude to War', new Date(2024, 2, 21), 1942, -1),
    createEntry('Starship Troopers', new Date(2024, 2, 20), 1997, 2),
];

async function seedMovies() {
    await Promise.all(
        movies.map(async (movie) => {
            const thing = await db.insert(things).values(movie).returning({ insertedId: things.id });
            const entry: EntryInsert = { thing_id: thing[0].insertedId, ...movie };
            await db.insert(entries).values(entry);
        }),
    );
}

async function main() {
    await seedMovies();
}

main();
