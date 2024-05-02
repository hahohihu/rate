"use client";

import { getProvider } from "@/data/provider/all";
import { ExternThings } from "@/data/provider/interface";
import { useRouter } from "next/navigation";
import { titleStyle } from "../text";
import { ProviderShell } from "./shell";

export function ProviderView({ matches }: { matches: ExternThings }) {
    const router = useRouter();
    return (
        <ProviderShell header={matches.provider_name}>
            {
                matches.things.map((thing, i) => {
                    async function createNewThing() {
                        let provider = getProvider(matches.provider_name);
                        let id = await provider.insertThing(thing);
                        router.push(`/thing/${id}`);
                    }
                    return <li key={i}>
                        <div className="flex gap-2 items-end">
                            <button className={`text-lg action-link ${titleStyle}`} onClick={() => createNewThing()}>
                                {thing.name}
                            </button>
                            <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
                        </div>
                    </li>;
                })
            }
        </ProviderShell>
    );
}
