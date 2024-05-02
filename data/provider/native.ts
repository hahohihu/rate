import { Thing } from "../drizzle/schema";
import { fetchThings } from "../thing";
import { Provider } from "./interface";

// can't pass classes across client-server boundary, so just do it good-ol enum style instead a la Rust/Haskell
// alternative: do it decorator style, return functions that create the ui elements? - don't know if this even works

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
