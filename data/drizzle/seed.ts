import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { entries, things } from './schema';

const db = drizzle(sql);

class Movie {
    name: string;
    watch_date: Date;
    prod_year: number;
    rating: number;

    constructor(name: string, watch: Date, release: number, rating: number) {
        this.name = name;
        this.watch_date = watch;
        this.prod_year = release;
        this.rating = rating;
    }
}

const movies = [
    new Movie("National Theatre Live: Fleabag", new Date(2024, 4, 21), 2019, 2.5),
    new Movie("Z", new Date(2024, 4, 7), 1969, 1.5),
    new Movie("Ice Merchants", new Date(2024, 4, 5), 2022, 1.2),
    new Movie("Gods of Egypt", new Date(2024, 4, 5), 2016, .5),
    new Movie("A Short Film About Killing", new Date(2024, 4, 5), 1988, 1.6),
    new Movie("Madame Web", new Date(2024, 4, 4), 2024, .8),
    new Movie("Injustice", new Date(2024, 3, 30), 2021, 0),
    new Movie("The Devil in Miss Jones", new Date(2024, 3, 22), 1973, -.5),
    new Movie("Big Trouble in Little China", new Date(2024, 3, 22), 1986, -.5),
    new Movie("Prelude to War", new Date(2024, 3, 21), 1942, -1),
    new Movie("Starship Troopers", new Date(2024, 3, 20), 1997, 2),
];

async function seedMovies() {
    await Promise.all(
        movies.map(async movie => {
            let thing = await db.insert(things).values(movie).returning( { insertedId: things.id } );
            let entry = movie as any;
            entry.object_id = thing[0].insertedId;
            await db.insert(entries).values(entry);
        })
    );
}

async function main() {
    await seedMovies();
}

main();