import { ExternThingDescription, Provider } from "./interface";
import icon from '@/public/provider/letterboxd-favicon.ico';

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

export class LetterboxdProvider extends Provider {
    name = "letterboxd" as const;
    icon = icon;

    async searchThings(query: string): Promise<ExternThingDescription[]> {
        let matches = await LetterboxdAPI.search(query);
        return matches.map(thing => {
            let link = thing.film.links.find((link: any) => link.type === "letterboxd");
            let poster_url = thing.film.poster?.sizes.find((poster: any) => poster.width >= 150 && poster.width <= 300).url;
            return {
                name: thing.film.name,
                url_source: link.url,
                poster_url,
                // this is wrong since letterboxd also includes TV series, but they don't supply that data
                type: "movie",
                prod_year: thing.film.releaseYear
            }
        });
    }
}
