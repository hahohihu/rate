import { ThingTypeEnum, parseThingType } from "../drizzle/schema";
import { ExternThingDescription, Provider } from "./interface";
import icon from '@/public/provider/anilist-favicon.ico';

class AnilistAPI {
    static url = "https://graphql.anilist.co";

    static async search(query: string): Promise<any[]> {
        let url = new URL(`${AnilistAPI.url}/series/search`);
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: `
                query($search: String) {
                    Page {
                      media(search: $search, type: ANIME) {
                        title {
                          romaji
                          english
                          native
                        }
                        type
                        startDate {
                          year
                        }
                        coverImage {
                          large
                        }
                        siteUrl
                      }
                    }
                  }
                `,
                variables: {
                    search: query
                }
            })
        });
        const manga = await resp.json();
        return manga.data.Page.media;
    }
}

export class AnilistProvider extends Provider {
    name = "anilist" as const;
    icon = icon;

    async searchThings(query: string): Promise<ExternThingDescription[]> {
        let matches = await AnilistAPI.search(query);
        return matches.map(thing => {
            console.log(thing);
            return {
                name: thing.title.english,
                url_source: thing.siteUrl,
                type: 'anime',
                poster_url: thing.coverImage.large,
                prod_year: thing.startDate.year
            }
        });
    }
}
