'use server';

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
        where: ilike(things.name, `%${query}%`),
    });
}

export async function fetchThing(id: number) {
    const thing = await db.query.things.findFirst({
        where: eq(things.id, id),
    });
    if (!thing) {
        throw new Error(`Unexpected: Thing ID (${id}) was not found`);
    }
    return thing;
}

export async function addThing(name: string, prod_year?: number): Promise<number> {
    const res = await db.insert(things)
        .values({ name, prod_year })
        .returning({ insertedId: things.id });
    return res[0].insertedId;
}

const AddThingSchema = z.object({
    media_name: z.string(),
    prod_year: z.coerce.number().int(),
});

export async function addThingForm(formData: FormData) {
    const { media_name, prod_year } = AddThingSchema.parse({
        media_name: formData.get('media_name'),
        prod_year: formData.get('prod_year'),
    });

    const id = await addThing(media_name, prod_year);

    redirect(`/add/entry?thing=${id}`);
}
