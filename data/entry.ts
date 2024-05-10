'use server';

import { revalidatePath, unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { desc, eq } from 'drizzle-orm';
import { db } from './drizzle/db';
import { entries, things } from './drizzle/schema';

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
        .orderBy(desc(entries.watch_date));
}

const AddEntrySchema = z.object({
    rating: z.coerce.number(),
    review: z.string().optional(),
});

export async function addEntry(thing_id: number, formData: FormData) {
    const { rating, review } = AddEntrySchema.parse({
        rating: formData.get('rating'),
        review: formData.get('review')
    });

    console.info(`Adding entry for thing: ${thing_id}, rating: ${rating}, review: ${review}`)

    const entry = await db.insert(entries).values({
        rating,
        thing_id,
        review,
        watch_date: new Date(),
    }).returning();

    const url = `/thing/${thing_id}`;
    revalidatePath(url);
    redirect(url);
}
