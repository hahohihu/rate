import { addThing } from "../thing";
import { ExternThingDescription, Provider } from "./interface";

class MangaupdatesAPI {
    static url = "https://api.mangaupdates.com/v1";

    static async search(query: string): Promise<any[]> {
        let url = new URL(`${MangaupdatesAPI.url}/series/search`);
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search: query,
                perpage: 20,
            })
        });
        const manga = await resp.json();
        return manga.results;
    }
}

export interface MangaupdatesThing extends ExternThingDescription {
    name: string;
    prod_year: number;
}

export class MangaupdatesProvider implements Provider {
    name = "mangaupdates";

    async searchThings(query: string): Promise<MangaupdatesThing[]> {
        let matches = await MangaupdatesAPI.search(query);
        return matches.map(thing => {
            return {
                name: thing.record.title,
                url_source: thing.record.url,
                prod_year: Number(thing.record.year)
            }
        });
    }

    async insertThing(thing: MangaupdatesThing) {
        return await addThing(thing.name, thing.prod_year);
    }
}
