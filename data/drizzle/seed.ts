import { EntryInsert, ThingInsert, entries, reviews, things } from './schema';
import { db } from './db';

type ExtraFields = {
    review?: string
};

function createEntry(
    name: string,
    watch_date: Date,
    prod_year: number,
    rating: number,
    optional?: ExtraFields
): EntryInsert & ThingInsert & ExtraFields {
    return {
        name,
        watch_date,
        prod_year,
        rating,
        review: optional?.review
    };
}

const movies = [
    createEntry('National Theatre Live: Fleabag', new Date(2024, 3, 21), 2019, 2.5),
    createEntry('Z', new Date(2024, 3, 7), 1969, 1.5),
    createEntry('Ice Merchants', new Date(2024, 3, 5), 2022, 1.2),
    createEntry('Gods of Egypt', new Date(2024, 3, 5), 2016, 0.5),
    createEntry('A Short Film About Killing', new Date(2024, 3, 5), 1988, 1.6, { review: "Having seen a monster for what it is, you're allowed to sympathize with them." }),
    createEntry('Madame Web', new Date(2024, 3, 4), 2024, 0.8),
    createEntry('Injustice', new Date(2024, 2, 30), 2021, 0),
    createEntry('Big Trouble in Little China', new Date(2024, 2, 22), 1986, -0.5),
    createEntry('Prelude to War', new Date(2024, 2, 21), 1942, -1),
    createEntry('Starship Troopers', new Date(2024, 2, 20), 1997, 2),
    createEntry('School on Fire', new Date(2024, 2, 12), 1988, 2.6, { review: "Exploitation at its finest - increasingly and unbearably tense until the last bits of restraint snap. There's a quality to this film that puts it a step above most of its kind, but I can't quite put my finger on it. Maybe just good taste." }),
];

async function seedMovies() {
    await Promise.all(
        movies.map(async (row) => {
            const thing = await db.insert(things).values(row).returning();
            const entry = await db.insert(entries)
                .values({ thing_id: thing[0].id, ...row })
                .returning();
            if (row.review) {
                await db.insert(reviews).values({ entry_id: entry[0].id, text: row.review });
            }
        }),
    );
}

async function main() {
    await seedMovies();
    // DB stays alive otherwise and no way to close it with Drizzle
    process.exit();
}

main();
