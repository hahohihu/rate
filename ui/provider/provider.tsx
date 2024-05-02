"use client";

import { getProvider } from "@/data/provider/all";
import { ExternThings } from "@/data/provider/interface";
import { useRouter } from "next/navigation";

export function ProviderView({ matches }: { matches: ExternThings }) {
    const router = useRouter();
    return (
        <div className="relative border p-5 min-w-40">
            <h1 className="absolute bg-color-middle px-1 -top-3">{matches.provider_name}</h1>
            <ul className="space-y-3">
                {
                    matches.things.map((thing, i) => {
                        async function createNewThing() {
                            let provider = getProvider(matches.provider_name);
                            let id = await provider.insertThing(thing);
                            router.push(`/thing/${id}`);
                        }
                        return <li key={i}>
                            <div className="flex gap-2 items-end">
                                <button className='text-lg leading-none action-link' onClick={() => createNewThing()}>
                                    {thing.name}
                                </button>
                                <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </div>
    );
}
