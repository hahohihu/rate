'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { desc, eq } from 'drizzle-orm';
import { db } from './drizzle/db';
import { entries, reviews, things } from './drizzle/schema';

export async function fetchEntry(id: number) {
    return db.query.entries.findFirst({
        where: eq(entries.id, id)
    });
}

export async function fetchEntries() {
    unstable_noStore();

    return db.select()
        .from(entries)
        .innerJoin(things, eq(things.id, entries.thing_id))
        .orderBy(desc(entries.watch_date))
        .limit(50);
}

export async function fetchEntriesForThing(thing_id: number) {
    unstable_noStore();
    
    return db.select()
        .from(entries)
        .where(eq(entries.thing_id, thing_id))
        .leftJoin(reviews, eq(entries.id, reviews.entry_id))
        .orderBy(desc(entries.watch_date));
}

const AddEntrySchema = z.object({
    rating: z.coerce.number(),
});

export async function addEntry(thing_id: number, formData: FormData) {
    const { rating } = AddEntrySchema.parse({
        rating: formData.get('rating'),
    });

    await sql`
        INSERT INTO entries (thing_id, watch_date, rating)
        VALUES (${thing_id}, NOW(), ${rating});
    `;

    const url = `/thing/${thing_id}`;
    revalidatePath(url);
    redirect(url);
}
