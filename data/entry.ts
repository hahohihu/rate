'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type Entry = {
    id: number;
    watch_date: Date
    rating: number;
};

export type FullEntry = Entry & {
    name: string;
    prod_year: number;
};

export async function fetchEntries() {
    unstable_noStore();

    const data = await sql<FullEntry> `
        SELECT entries.id, objects.name, objects.prod_year, entries.watch_date, entries.rating 
        FROM entries
        JOIN objects ON objects.id = entries.object_id
        ORDER BY watch_date DESC
        LIMIT 50`;

    return data.rows;
}

export async function fetchEntriesForObject(objectId: number) {
    unstable_noStore();

    const data = await sql<Entry>`
        SELECT id, watch_date, rating
        FROM entries
        WHERE object_id = ${objectId}
    `;

    return data.rows;
}

const AddEntrySchema = z.object({
    rating: z.coerce.number(),
});

export async function addEntry(object_id: number, formData: FormData) {
    const { rating } = AddEntrySchema.parse({
        rating: formData.get('rating'),
    });

    // todo: not handling timezones
    await sql`
        INSERT INTO entries (object_id, watch_date, rating)
        VALUES (${object_id}, NOW(), ${rating});
    `;

    // todo: navigate to object
    revalidatePath("/");
    redirect("/");
}

