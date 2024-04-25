import { fetchEntriesForObject } from "@/data/entry";
import { Flex } from "antd";

export default async function Entries({ objectId, className }: { objectId: number, className?: string }) {
    let entries = await fetchEntriesForObject(objectId);

    return (
        <div className={className}>
            <ul>
                {entries.map(entry => (
                    <li>
                        {entry.rating} on {entry.watch_date
                            .toLocaleDateString('default', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                    </li>
                ))}
            </ul>
        </div>
    );
}
