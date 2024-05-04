import { StaticImageData } from "next/image";

export interface ProviderInfo {
    name: string;
    icon: StaticImageData;
}

export type ExternThings = {
    provider: ProviderInfo;
    things: ExternThingDescription[];
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
