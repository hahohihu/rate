import { StaticImageData } from "next/image";
import { addThing, addThingProvider } from "../thing";
import { providerTypeStrings } from "../drizzle/schema";

export interface ProviderInfo {
    name: ProviderTypeEnum;
    icon: StaticImageData;
}

export interface ExternThingDescription {
    name: string;
    url_source: string;
    prod_year?: number | null;
}

export interface Provider extends ProviderInfo {
    searchThings(query: string): Promise<ExternThingDescription[]>;
    insertThing(thing: ExternThingDescription): Promise<number>;
}

export function isolateProviderInfo(provider: Provider): ProviderInfo {
    return Object.assign({}, provider);
}

export async function insertThingGeneric(provider: Provider, thing: ExternThingDescription) {
    let thing_id = await addThing(thing.name, thing.prod_year);
    await addThingProvider({
        thing_id,
        provider_type: provider.name,
        source_url: thing.url_source,
    })
    return thing_id;
}

export type ProviderTypeEnum = typeof providerTypeStrings[number];
