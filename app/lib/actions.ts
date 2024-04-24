'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const AddFormSchema = z.object({
    rating: z.coerce.number(),
});

export async function addEntry(object_id: number, formData: FormData) {
    const { rating } = AddFormSchema.parse({
        rating: formData.get('rating'),
    });

    // todo: not handling timezones
    sql`
        INSERT INTO entries (object_id, watch_date, rating)
        VALUES (${object_id}, NOW(), ${rating});
    `;

    // todo: navigate to object
    revalidatePath("/");
    redirect("/");
}
