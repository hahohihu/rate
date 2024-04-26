import { getThing } from "@/data/thing";

export default async function ThingInfo({ id, className }: { id: number, className?: string }) {
    let thing = await getThing(id);

    if (!thing) {
        throw new Error(`Thing (${id}) doesn't exist`);
    }

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-normal text-fg-dominant leading-none">{thing.name}</span>
                <span className="text-fg-reach text-sm leading-none">{thing.prod_year}</span>
            </div>
        </div>
    );
}
