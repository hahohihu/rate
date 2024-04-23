'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const AddFormSchema = z.object({
    name: z.string(),
    prod_year: z.coerce.number().int(),
    rating: z.coerce.number(),
});

export async function addEntry(formData: FormData) {
    const { name, prod_year, rating } = AddFormSchema.parse({
        name: formData.get('media_name'),
        prod_year: formData.get('prod_year'),
        rating: formData.get('rating'),
    });

    // todo: not handling timezones
    sql`
        INSERT INTO entries (name, prod_year, watch_date, rating)
        VALUES (${name}, ${prod_year}, NOW(), ${rating});
    `;

    revalidatePath("/");
    redirect("/");
}
