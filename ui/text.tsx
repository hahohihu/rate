import { fetchThing } from '@/data/thing';
import Link from 'next/link';

const titleStyle = 'text-color-dominant font-normal';

export function ThingTitleLink({ name, thingId, className }: {
    name: string,
    thingId: number,
    className?: string,
}) {
    return (
        <Link href={`/thing/${thingId}`} className={`${className} ${titleStyle}`}>
            {name}
        </Link>
    );
}

export function ThingTitle({ name, className }: {
    name: string,
    className?: string,
}) {
    return (
        <span className={`${className} ${titleStyle}`}>
            {name}
        </span>
    );
}

export async function ThingHeader({ thingId }: { thingId: number }) {
    const thing = await fetchThing(thingId);
    return (
        <div className="flex gap-2 items-end mb-2">
            <ThingTitle className="text-2xl leading-none" name={thing?.name ?? "<name>"} />
            <span className="text-color-reach text-sm leading-none">{thing?.prod_year ?? "----"}</span>
        </div>
    );
}
