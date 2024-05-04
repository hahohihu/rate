import { fetchThing } from '@/data/thing';
import { ThingTitle, ThingTitleSkeleton } from '@/ui/text';
import { Suspense } from 'react';

type Args = { id: number, className?: string };

async function ThingInfoInner({ id, className }: Args) {
    const thing = await fetchThing(id);

    return (
        <div className="flex gap-2 items-end">
            <ThingTitle className="text-2xl leading-none max-w-[400px]" name={thing.name} />
            <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
        </div>
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
