import { fetchEntriesForThing } from '@/data/entry';
import { ratingColor } from '@/lib/utility';
import { StylizedRating } from '@/ui/text';

export default async function Entries({ thingId, className }: { thingId: number, className?: string }) {
    const entries = await fetchEntriesForThing(thingId);

    return (
        <div className={className}>
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
                            <div className="border-l-2 border-color-noise px-2">
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
