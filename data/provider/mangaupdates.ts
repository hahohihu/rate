import { ThingTypeEnum, parseThingType } from "../drizzle/schema";
import { ExternThingDescription, Provider } from "./interface";
import icon from '@/public/provider/mangaupdates-favicon.ico';

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

export class MangaupdatesProvider extends Provider {
    name = "mangaupdates" as const;
    icon = icon;

    async searchThings(query: string): Promise<ExternThingDescription[]> {
        let matches = await MangaupdatesAPI.search(query);
        return matches.map(thing => {
            return {
                name: thing.record.title,
                url_source: thing.record.url,
                type: parseThingType((thing.record.type as string).toLowerCase()),
                poster_url: thing.record.image.url.original,
                prod_year: Number(thing.record.year)
            }
        });
    }
}
