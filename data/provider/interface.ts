import { StaticImageData } from "next/image";
import { addThing, addThingProvider } from "../thing";
import { ProviderTypeEnum, ThingTypeEnum } from "../drizzle/schema";

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
    type: ThingTypeEnum;
    poster_url?: string;
    prod_year?: number;
}

export abstract class Provider implements ProviderInfo {
    abstract name: ProviderTypeEnum;
    abstract icon: StaticImageData;

    abstract searchThings(query: string): Promise<ExternThingDescription[]>;
    async insertThing(thing: ExternThingDescription): Promise<number> {
        let thing_id = await addThing(thing);
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
