import { AnilistProvider } from "./anilist";
import { Provider } from "./interface";
import { LetterboxdProvider } from "./letterboxd";
import { MangaupdatesProvider } from "./mangaupdates";

export const PROVIDERS = [
    new LetterboxdProvider(),
    new MangaupdatesProvider(),
    new AnilistProvider(),
];

const PROVIDER_MAPPING = PROVIDERS
    .reduce((
        map: { [type: string]: Provider },
        el: Provider
    ) => {
        map[el.name] = el;
        return map;
    }, {});

export function getProvider(providerName: string) {
    return PROVIDER_MAPPING[providerName];
}
