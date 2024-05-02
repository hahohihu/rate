import { addThing } from "../thing";
import { ExternThingDescription, Provider } from "./interface";

class LetterboxdAPI {
    static url = "https://api.letterboxd.com/api/v0";

    static async search(query: string): Promise<any[]> {
        let url = new URL(`${LetterboxdAPI.url}/search`);
        url.searchParams.append('adult', 'true');
        url.searchParams.append('include', 'FilmSearchItem');
        url.searchParams.append('searchMethod', 'Autocomplete');
        url.searchParams.append('input', query);
        const resp = await fetch(url);
        const films = await resp.json();
        return films.items;
    }
}

export interface LetterboxdThing extends ExternThingDescription {
    id: string;
    name: string;
    prod_year: number;
}

export class LetterboxdProvider implements Provider {
    name = "letterboxd";

    async searchThings(query: string): Promise<LetterboxdThing[]> {
        let matches = await LetterboxdAPI.search(query);
        return matches.map(thing => {
            console.log(thing);
            return {
                id: thing.film.id,
                name: thing.film.name,
                prod_year: thing.film.releaseYear
            }
        });
    }

    async insertThing(thing: LetterboxdThing) {
        return await addThing(thing.name, thing.prod_year);
    }
}
