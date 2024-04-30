import { fetchThing } from '@/data/thing';
import { ThingTitle } from '@/ui/text';

export default async function ThingInfo({ id, className }: { id: number, className?: string }) {
    const thing = await fetchThing(id);

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex gap-2 items-end">
                <ThingTitle className="text-2xl" name={thing.name} />
                <span className="text-color-reach text-sm">{thing.prod_year}</span>
            </div>
        </div>
    );
}
