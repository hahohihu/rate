import { ThingTitleLink } from "../text";
import { ProviderShell } from "./shell";
import { fetchThings } from "@/data/thing";

export async function NativeSearchView({ query }: { query: string }) {
    let things = await fetchThings(query);
    if (things.length === 0) {
        return <></>;
    }
    return (
        <ProviderShell header={"native"}>
            {
                things.map((thing, i) => {
                    return <li key={i}>
                        <div className="flex gap-2 items-end">
                            <ThingTitleLink thingId={thing.id} name={thing.name} className="text-lg" />
                            <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
                        </div>
                    </li>;
                })
            }
        </ProviderShell>
    );
}
