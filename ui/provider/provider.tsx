"use client";

import { getProvider } from "@/data/provider/all";
import { ExternThings, ProviderInfo, ProviderType } from "@/data/provider/interface";
import { useRouter } from "next/navigation";
import { titleStyle } from "../text";
import { ProviderShell } from "./shell";
import AddIcon from '@/public/add.svg';
import { Link } from "react-aria-components";
import Image from "next/image";

export function ProviderHeader({ providerInfo }: { providerInfo: ProviderInfo }) {
    return <span className="flex gap-1">
        <Image width="24" height="24" src={providerInfo.icon} alt="" aria-hidden="true" />
        {ProviderType[providerInfo.type]}
    </span>;
}

export function ProviderView({ matches }: { matches: ExternThings }) {
    const router = useRouter();
    return (
        <ProviderShell header={
            <ProviderHeader providerInfo={matches.provider} />
        } expandable={matches.things.length > 4}>
            {
                matches.things.map((thing, i) => {
                    async function createNewThing() {
                        let provider = getProvider(matches.provider.type);
                        let id = await provider.insertThing(thing);
                        router.push(`/thing/${id}`);
                    }
                    return <li key={i} className="border-b border-color-noise pb-2">
                        <div className="flex gap-2 items-center">
                            <Link className={`text-lg action-link ${titleStyle}`} href={thing.url_source}>{thing.name}</Link>
                            <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
                            <button aria-label="Add new thing"
                                className="min-w-[20px] min-h-[20px] ml-auto bg-color-reach hover:bg-color-hover"
                                style={{
                                    maskImage: `url(${AddIcon.src})`,
                                    backgroundRepeat: "no-repeat"
                                }}
                                onClick={() => createNewThing()}
                            ></button>
                        </div>
                    </li>;
                })
            }
        </ProviderShell>
    );
}
