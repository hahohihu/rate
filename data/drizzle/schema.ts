import {
    pgEnum,
    pgTable, real, serial, smallint, text, timestamp
} from 'drizzle-orm/pg-core';

export const things = pgTable('things', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    prod_year: smallint('prod_year'),
    poster_url: text('poster_url')
});

export type Thing = typeof things.$inferSelect;
export type ThingInsert = typeof things.$inferInsert;

export const entries = pgTable('entries', {
    id: serial('id').primaryKey(),
    thing_id: serial('thing_id').references(() => things.id).notNull(),
    watch_date: timestamp('watch_date').notNull(),
    rating: real('rating').notNull(),
});

export type Entry = typeof entries.$inferSelect;
export type EntryInsert = typeof entries.$inferInsert;

export const reviews = pgTable('reviews', {
    id: serial('id').primaryKey(),
    entry_id: serial('entry_id').references(() => entries.id).notNull(),
    text: text('text').notNull()
});

export type Review = typeof reviews.$inferSelect;
export type ReviewInsert = typeof reviews.$inferInsert;

export const providerTypeStrings = ['letterboxd', 'mangaupdates'] as const;
export const providerTypeEnum = pgEnum('provider_type', providerTypeStrings);

export const thingProviders = pgTable('thing_providers', {
    id: serial('id').primaryKey(),
    thing_id: serial('thing_id').references(() => things.id).notNull(),
    provider_type: providerTypeEnum('provider_type').notNull(),
    source_url: text('source_url').notNull(),
});

export type ThingProvider = typeof thingProviders.$inferSelect;
export type ThingProviderInsert = typeof thingProviders.$inferInsert;
