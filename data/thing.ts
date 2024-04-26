'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { eq, ilike } from 'drizzle-orm';
import { db } from './drizzle/db';
import { things } from './drizzle/schema';

export async function fetchThings(query: string) {
    unstable_noStore();

    return db.query.things.findMany({
        limit: 25,
        where: ilike(things.name, query),
    });
}

export async function getThing(id: number) {
    return db.query.things.findFirst({
        where: eq(things.id, id),
    });
}

const AddThingSchema = z.object({
    media_name: z.string(),
    prod_year: z.coerce.number().int(),
});

export async function addThing(formData: FormData) {
    const { media_name, prod_year } = AddThingSchema.parse({
        media_name: formData.get('media_name'),
        prod_year: formData.get('prod_year'),
    });

    const res = await sql`
        INSERT INTO things (name, prod_year)
        VALUES (${media_name}, ${prod_year})
        RETURNING id;
    `;

    const { id } = res.rows[0];
    // todo: navigate to /add/entry
    redirect(`/add/entry?thing=${id}`);
}
