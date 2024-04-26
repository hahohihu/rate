import { getThing } from '@/data/thing';
import { ThingTitle } from '@/ui/text';

export default async function ThingInfo({ id, className }: { id: number, className?: string }) {
    const thing = await getThing(id);

    if (!thing) {
        throw new Error(`Thing (${id}) doesn't exist`);
    }

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex gap-2 items-center">
                <ThingTitle className="text-2xl" name={thing.name} />
                <span className="text-fg-reach text-sm">{thing.prod_year}</span>
            </div>
        </div>
    );
}
