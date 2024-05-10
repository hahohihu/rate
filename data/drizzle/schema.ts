import {
    pgEnum,
    pgTable, real, serial, smallint, text, timestamp
} from 'drizzle-orm/pg-core';

export const thingTypeStrings = ['movie', 'manga', 'doujinshi', 'novel', 'artbook', 'other'] as const;
export const thingTypeEnum = pgEnum('thing_type', thingTypeStrings);
export type ThingTypeEnum = typeof thingTypeStrings[number];
const thingTypeLookup: {[str: string]: ThingTypeEnum} = (() => {
    return thingTypeStrings.reduce((a, v) => ({ ...a, [v]: v}), {});
})();
export function parseThingType(rawInput: string) {
    try {
        return thingTypeLookup[rawInput];
    } catch (e) {
        return 'other';
    }
}

export const things = pgTable('things', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    prod_year: smallint('prod_year'),
    poster_url: text('poster_url'),
    type: thingTypeEnum('type').notNull().default('other'),
});

export type Thing = typeof things.$inferSelect;
export type ThingInsert = typeof things.$inferInsert;

export const entries = pgTable('entries', {
    id: serial('id').primaryKey(),
    thing_id: serial('thing_id').references(() => things.id).notNull(),
    watch_date: timestamp('watch_date').notNull(),
    rating: real('rating').notNull(),
    review: text('review'),
});

export type Entry = typeof entries.$inferSelect;
export type EntryInsert = typeof entries.$inferInsert;

export const providerTypeStrings = ['letterboxd', 'mangaupdates'] as const;
export const providerTypeEnum = pgEnum('provider_type', providerTypeStrings);
export type ProviderTypeEnum = typeof providerTypeStrings[number];

export const thingProviders = pgTable('thing_providers', {
    id: serial('id').primaryKey(),
    thing_id: serial('thing_id').references(() => things.id).notNull(),
    provider_type: providerTypeEnum('provider_type').notNull(),
    source_url: text('source_url').notNull(),
});

export type ThingProvider = typeof thingProviders.$inferSelect;
export type ThingProviderInsert = typeof thingProviders.$inferInsert;
