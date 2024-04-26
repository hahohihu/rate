import { getObject } from "@/data/object";

export default async function ObjectInfo({ id, className }: { id: number, className?: string }) {
    let object = await getObject(id);

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-normal text-fg-dominant leading-none">{object.name}</span>
                <span className="text-fg-reach text-sm leading-none">{object.prod_year}</span>
            </div>
        </div>
    );
}
