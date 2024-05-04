import { fetchEntriesForThing } from '@/data/entry';
import { StylizedRating } from '@/ui/text';
import { Suspense } from 'react';
import { SkeletonLine } from '../skeleton';

type Args = { thingId: number };

async function EntriesInner({ thingId }: Args) {
    const entries = await fetchEntriesForThing(thingId);

    return (
        <div className="p-4">
            <ul>
                {entries.map((entry) => (
                    <li key={entry.entries.id} className="mb-2 border-b border-color-noise">
                        <div className="flex gap-2 items-center">
                            <StylizedRating rating={entry.entries.rating} className="text-lg" />
                            <span className="text-color-reach text-sm">
                                {entry.entries.watch_date
                                    .toLocaleDateString('default', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                            </span>
                        </div>
                        {entry.reviews ?
                            <div className="border-l-2 border-color-noise px-2 pb-1">
                                {entry.reviews.text}
                            </div>
                            : null
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}

function EntriesSkeleton() {
    function Review() {
        return <div className="flex flex-col">
            <div className="flex">
                <SkeletonLine className="w-10" />
                <SkeletonLine className="w-20" />
            </div>
            <SkeletonLine className="ml-4 w-80"/>
            <SkeletonLine className="ml-4 w-80"/>
            <SkeletonLine className="ml-4 w-80"/>
        </div>;
    }

    return <div className="p-4 flex flex-col gap-2">
        <Review />
        <Review />
        <Review />
    </div>
}

export default function Entries(args: Args) {
    return <Suspense fallback={<EntriesSkeleton />}>
        <EntriesInner {...args} />
    </Suspense>
}
