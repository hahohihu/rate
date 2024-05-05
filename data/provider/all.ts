import { Provider, ProviderType } from "./interface";
import { LetterboxdProvider } from "./letterboxd";
import { MangaupdatesProvider } from "./mangaupdates";

export const PROVIDERS = [
    new LetterboxdProvider(),
    new MangaupdatesProvider(),
];

type ProviderMap = { [type in ProviderType]: Provider };

const PROVIDER_MAPPING: ProviderMap = PROVIDERS
    .reduce((
        map: { [type in ProviderType]?: Provider },
        el: Provider
    ) => {
        map[el.type] = el;
        return map;
    }, {}) as ProviderMap;

export function getProvider(providerName: ProviderType) {
    return PROVIDER_MAPPING[providerName];
}
