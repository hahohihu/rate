import { StaticImageData } from "next/image";
import { addThing, addThingProvider } from "../thing";
import { providerTypeStrings } from "../drizzle/schema";

export interface ProviderInfo {
    name: ProviderTypeEnum;
    icon: StaticImageData;
}

export type ExternThings = {
    provider: ProviderInfo;
    things: ExternThingDescription[];
}

export interface ExternThingDescription {
    name: string;
    url_source: string;
    poster_url?: string;
    prod_year?: number;
}

export abstract class Provider implements ProviderInfo {
    abstract name: ProviderTypeEnum;
    abstract icon: StaticImageData;

    abstract searchThings(query: string): Promise<ExternThingDescription[]>;
    async insertThing(thing: ExternThingDescription): Promise<number> {
        console.log(thing);
        let thing_id = await addThing(thing);
        console.log(thing_id);
        await addThingProvider({
            thing_id,
            provider_type: this.name,
            source_url: thing.url_source,
        });
        return thing_id;
    }

    providerInfo(): ProviderInfo {
        return Object.assign({}, this);
    }
}

export type ProviderTypeEnum = typeof providerTypeStrings[number];
