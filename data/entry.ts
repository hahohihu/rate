'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "./drizzle/db";
import { desc, eq } from "drizzle-orm";
import { entries, things } from "./drizzle/schema";

export async function fetchEntries() {
    unstable_noStore();

    return db.select()
        .from(entries)
        .innerJoin(things, eq(things.id, entries.object_id))
        .orderBy(desc(entries.watch_date))
        .limit(50);
}

export async function fetchEntriesForObject(objectId: number) {
    unstable_noStore();

    return db.query.entries.findMany({
        where: eq(entries.object_id, objectId),
        orderBy: [desc(entries.watch_date)]
    });
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

