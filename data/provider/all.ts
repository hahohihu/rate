import { Provider, ExternThingDescription } from "./interface";
import { LetterboxdProvider } from "./letterboxd";
import { NativeDataProvider } from "./native";

export const PROVIDERS = [
    new LetterboxdProvider(),
    new NativeDataProvider(),
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
