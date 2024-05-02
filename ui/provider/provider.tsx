"use client";

import { getProvider } from "@/data/provider/all";
import { ExternThings } from "@/data/provider/interface";
import { useRouter } from "next/navigation";
import { titleStyle } from "../text";
import { ProviderShell } from "./shell";
import AddIcon from '@/public/add.svg';
import Image from 'next/image'
import styles from './styles.module.css';
import { Link } from "react-aria-components";

export function ProviderView({ matches }: { matches: ExternThings }) {
    const router = useRouter();
    return (
        <ProviderShell header={matches.provider_name} expandable={matches.things.length > 4}>
            {
                matches.things.map((thing, i) => {
                    async function createNewThing() {
                        let provider = getProvider(matches.provider_name);
                        let id = await provider.insertThing(thing);
                        router.push(`/thing/${id}`);
                    }
                    return <li key={i} className="border-b border-color-noise pb-2 max-w-[25rem]">
                        <div className="flex gap-2 items-center">
                            <button aria-label="Add new thing"
                                className="min-w-[20px] min-h-[20px] bg-color-reach hover:bg-color-hover"
                                style={{
                                    maskImage: `url(${AddIcon.src})`,
                                    backgroundRepeat: "no-repeat"
                                }}
                                onClick={() => createNewThing()}
                                ></button>
                            <Link className={`text-lg action-link ${titleStyle}`} href={thing.url_source}>{thing.name}</Link>
                            <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
                        </div>
                    </li>;
                })
            }
        </ProviderShell>
    );
}
