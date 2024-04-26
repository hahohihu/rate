'use server';

import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "./drizzle/db";
import { eq, ilike } from "drizzle-orm";
import { things } from "./drizzle/schema";

export type DbObject = {
    id: number;
    name: string;
    prod_year: number;
};

export async function fetchObjects(query: string) {
    unstable_noStore();

    return db.query.things.findMany({
        limit: 25,
        where: ilike(things.name, query)
    });
}

export async function getObject(id: number) {
    return db.query.things.findFirst({
        where: eq(things.id, id)
    });
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

