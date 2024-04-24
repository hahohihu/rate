'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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

const AddObjectSchema = z.object({
    media_name: z.string(),
    prod_year: z.coerce.number().int(),
});

export async function addObject(formData: FormData) {
    const { media_name, prod_year } = AddObjectSchema.parse({
        media_name: formData.get('media_name'),
        prod_year: formData.get('prod_year'),
    });

    const res = await sql`
        INSERT INTO objects (name, prod_year)
        VALUES (${media_name}, ${prod_year})
        RETURNING id;
    `;

    const id = res.rows[0].id;
    // todo: navigate to /add/entry
    redirect("/add/entry?object=" + id);
}
