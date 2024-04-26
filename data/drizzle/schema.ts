import { pgTable, real, serial, smallint, timestamp, varchar } from 'drizzle-orm/pg-core';

export const things = pgTable('things', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    prod_year: smallint('prod_year'),
});

export type Thing = typeof things.$inferSelect;

export const entries = pgTable('entries', {
    id: serial('id').primaryKey(),
    thing_id: serial('thing_id').references(() => things.id).notNull(),
    watch_date: timestamp('watch_date').notNull(),
    rating: real('rating').notNull()
});

export type Entry = typeof entries.$inferSelect;
