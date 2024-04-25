'use server';

import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type DbObject = {
    id: number;
    name: string;
    prod_year: number;
};

export async function fetchObjects(query: string) {
    unstable_noStore();

    const data = await sql<DbObject> `
        SELECT id, name, prod_year
        FROM objects
        WHERE name ILIKE ${`%${query}%`}
        LIMIT 25;
    `;

    return data.rows;
}

export async function getObject(id: number) {
    const data = await sql<DbObject> `
        SELECT id, name, prod_year
        FROM objects
        WHERE id = ${id}
    `;

    return data.rows[0];
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

