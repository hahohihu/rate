import { fetchEntriesForThing } from '@/data/entry';
import { ratingColor } from '@/lib/utility';

export default async function Entries({ thingId, className }: { thingId: number, className?: string }) {
    const entries = await fetchEntriesForThing(thingId);

    return (
        <div className={className}>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id} className="flex gap-2 items-center">
                        <span className="text-lg" style={{ color: ratingColor(entry.rating) }}>
                            {entry.rating}
                        </span>
                        <span className="text-fg-reach text-sm">
                            {entry.watch_date
                                .toLocaleDateString('default', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
