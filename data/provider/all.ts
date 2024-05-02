import { Provider, ExternThingDescription } from "./interface";
import { LetterboxdProvider } from "./letterboxd";
import { MangaupdatesProvider } from "./mangaupdates";
import { NativeDataProvider } from "./native";

export const PROVIDERS = [
    new LetterboxdProvider(),
    new MangaupdatesProvider(),
];

const PROVIDER_MAPPING = PROVIDERS
    .reduce((
        map: { [name: string]: Provider },
        el
    ) => {
        map[el.name] = el;
        return map;
    }, {})

export function getProvider(providerName: string) {
    return PROVIDER_MAPPING[providerName]
}
