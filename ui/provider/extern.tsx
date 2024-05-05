import { Provider, ProviderInfo } from "@/data/provider/interface";
import { ProviderHeader, ProviderView } from "./provider";
import { Suspense } from "react";
import { ProviderShell } from "./shell";
import { SkeletonLine } from "../skeleton";

type Args = { provider: Provider; query: string; };

export async function ProviderListInner({ provider, query }: Args) {
    let things = await provider.searchThings(query);
    if (things.length == 0) {
        return <></>
    }
    return <ProviderView matches={{ provider: provider.providerInfo(), things }} />
}

function ExternViewSkeleton({ providerInfo }: { providerInfo: ProviderInfo }) {
    return (
        <ProviderShell header={<ProviderHeader providerInfo={providerInfo}/>} expandable={false}>
            <SkeletonLine/>
            <SkeletonLine/>
            <SkeletonLine/>
            <SkeletonLine/>
        </ProviderShell>
    )
}

export function ProviderList(args: Args) {
    return <Suspense fallback={<ExternViewSkeleton providerInfo={args.provider.providerInfo()}/>}>
        <ProviderListInner {...args}/>
    </Suspense>
}
