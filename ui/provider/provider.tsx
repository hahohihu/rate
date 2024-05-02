"use client";

import { getProvider } from "@/data/provider/all";
import { ExternThings } from "@/data/provider/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProviderView({ matches }: { matches: ExternThings }) {
    const router = useRouter();
    let [minimized, setMinimized] = useState(true);
    return (
        <div className={"relative border"}>
            <h1 className="absolute bg-color-bottom px-1 -top-3 left-2">{matches.provider_name}</h1>
            <ul className={`p-5 space-y-3 overflow-hidden ${minimized ? "max-h-40" : ""}`}>
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
            <button onClick={() => setMinimized(!minimized)} className="text-center w-full border-t">{minimized ? "expand" : "minimize"}</button>
        </div>
    );
}
