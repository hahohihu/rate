export interface ExternThings {
    provider_name: string;
    things: ExternThingDescription[];
}

export interface ExternThingDescription {
    name: string;
    prod_year?: number | null;
}

export interface Provider {
    name: string;
    searchThings(query: string): Promise<ExternThingDescription[]>;
    insertThing(thing: ExternThingDescription): Promise<number>;
}
