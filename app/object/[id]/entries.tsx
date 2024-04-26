import { fetchEntriesForObject } from "@/data/entry";
import { ratingColor } from "@/lib/utility";

export default async function Entries({ objectId, className }: { objectId: number, className?: string }) {
    let entries = await fetchEntriesForObject(objectId);

    return (
        <div className={className}>
            <ul>
                {entries.map(entry => (
                    <li className="flex gap-1 items-center">
                        <span className="text-lg" style={{ color: ratingColor(entry.rating) }}>
                            {entry.rating}
                        </span>
                        <span className="text-fg-reach text-sm">
                            {entry.watch_date
                                .toLocaleDateString('default', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
