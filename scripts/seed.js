const { db } = require('@vercel/postgres');

function formatDatePostgres(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

class Movie {
    constructor(name, watch, release, rating) {
        this.name = name;
        this.watch = watch;
        this.release = release;
        this.rating = rating;
    }
}

/*
1. Start with hardcoded movies
2. Generalize to mixed media (with or without year)

Need to convert this to tsx to support release year in an OO way?
e.g. Restaurants, experiences don't have a release time
    Can probably just ignore that and omit it - handle in the frontend

Need to be able to segment this, e.g. Manga ch1-50 - ch51-100
    Down the road

*/

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

async function seedObjects(client) {
    await client.sql`
        CREATE TABLE IF NOT EXISTS objects (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            prod_year SMALLINT NOT NULL
        );
    `;

    console.log("Objects table made");

    await Promise.all(
        movies.map(movie => {
            return client.sql`
                INSERT INTO objects (name, prod_year)
                VALUES (${movie.name}, ${movie.release});
                `;
        })
    );

    console.log("Inserted objects");
}

async function seedEntries(client) {
    await client.sql`
        CREATE TABLE IF NOT EXISTS entries (
            id SERIAL PRIMARY KEY,
            object_id SERIAL REFERENCES objects(id),
            watch_date TIMESTAMP NOT NULL,
            rating REAL NOT NULL CHECK (rating <> 'NaN')
        );
    `;

    console.log("Entry table made");

    await Promise.all(
        movies.map(movie => {
            return client.sql`
                INSERT INTO entries (object_id, watch_date, rating)
                SELECT objects.id, to_timestamp(${movie.watch.getTime() / 1000}), ${movie.rating}
                FROM objects WHERE objects.name = ${movie.name}
                `;
        })
    );

    console.log("Inserted entries");
}

async function main() {
    const client = await db.connect();
    
    await client.sql`DROP TABLE IF EXISTS entries;`;
    await client.sql`DROP TABLE IF EXISTS objects;`;
    await seedObjects(client);
    await seedEntries(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
