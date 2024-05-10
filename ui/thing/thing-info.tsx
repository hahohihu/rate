import { getProvider } from '@/data/provider/all';
import { fetchThing, fetchThingProviders } from '@/data/thing';
import { ThingTitle, ThingTitleSkeleton } from '@/ui/text';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type Args = { id: number, className?: string };

async function ThingInfoInner({ id, className }: Args) {
    const [thing, providers] = await Promise.all([fetchThing(id), fetchThingProviders(id)]);

    return (
        <section className="flex flex-col gap-2 items-center">
            {
                thing.poster_url ?
                    <img src={thing.poster_url!} alt="" className="max-h-60" aria-hidden={true} /> :
                    <div className="bg-color-noise rounded h-[200px] w-[150px] m-1" />
            }
            <div className="flex gap-2 items-center">
                <ThingTitle className="text-2xl leading-none max-w-[400px]" name={thing.name} />
                <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
            </div>
            <span className="flex items-center gap-2">
                <ul>
                    {
                        providers.map(thingProvider => {
                            let provider = getProvider(thingProvider.provider_type);
                            return <li key={thingProvider.id} className="flex">
                                <Link href={thingProvider.source_url} className="hover:brightness-125">
                                    <Image src={provider.icon} alt={thingProvider.provider_type} />
                                </Link>
                            </li>
                        })
                    }
                </ul>
                <span className="text-color-reach">
                    {thing.type}
                </span>
            </span>
        </section>
    );
}

function ThingInfoSkeleton() {
    return <ThingTitleSkeleton />;
}

export default function ThingInfo(args: Args) {
    return <section className={`flex flex-col mt-3 ${args.className}`}>
        <Suspense fallback={<ThingInfoSkeleton />}>
            <ThingInfoInner {...args} />
        </Suspense>
    </section>;
}
