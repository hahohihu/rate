import { fetchEntriesForThing } from '@/data/entry';
import { ratingColor } from '@/lib/utility';

export default async function Entries({ thingId, className }: { thingId: number, className?: string }) {
    const entries = await fetchEntriesForThing(thingId);

    return (
        <div className={className}>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.entries.id}>
                        <div className="flex gap-2 items-center">
                            <span className="text-lg" style={{ color: ratingColor(entry.entries.rating) }}>
                                {entry.entries.rating}
                            </span>
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
                            <div>
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
