import { getObject } from "@/data/object";
import { Flex } from "antd";

export default async function ObjectInfo({ id, className }: { id: number, className?: string }) {
    let object = await getObject(id);

    return (
        <Flex vertical className={className}>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-normal text-fg-dominant leading-none">{object.name}</span>
                <span className="text-fg-reach text-sm leading-none">{object.prod_year}</span>
            </div>
        </Flex>
    );
}
