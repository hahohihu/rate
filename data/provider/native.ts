import { Thing } from "../drizzle/schema";
import { fetchThings } from "../thing";
import { Provider } from "./interface";

export class NativeDataProvider implements Provider {
    name = "native";

    async searchThings(query: string) {
        let matches = await fetchThings(query);
        return matches;
    }

    async insertThing(thing: Thing) {
        return thing.id;
    }
}
