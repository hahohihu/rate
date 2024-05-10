import { Suspense } from "react";
import { ThingTitleLink } from "../text";
import { ProviderShell } from "./shell";
import { fetchThings } from "@/data/thing";
import { SkeletonLine } from "../skeleton";

type Args = { query: string };

async function NativeSearchViewInner({ query }: Args) {
    let things = await fetchThings(query);
    if (things.length === 0) {
        return <></>;
    }
    return (
        <ProviderShell header={"native"} expandable={things.length > 5} id="provider-native">
            {
                things.map((thing, i) => {
                    return <li key={i}>
                        <div className="flex gap-2 items-center">
                            <ThingTitleLink thingId={thing.id} name={thing.name} className="text-lg" />
                            <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
                        </div>
                    </li>
                })
            }
        </ProviderShell>
    );
}

function NativeViewSkeleton() {
    return (
        <ProviderShell header={"native"} expandable={false}>
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
        </ProviderShell>
    )
}

export function NativeSearchView(args: Args) {
    return <Suspense fallback={<NativeViewSkeleton />}>
        <NativeSearchViewInner {...args} />
    </Suspense>
}
