import Link from "next/link";

const titleStyle = "text-fg-dominant action-link font-normal";

export function ObjectTitleLink({ name, thingId, className }: {
    name: string,
    thingId: number,
    className?: string,
}) {
    return <Link href={`/thing/${thingId}`} className={`${className} ${titleStyle}`}>
        {name}
    </Link>;
}

export function ObjectTitle({ name, className }: {
    name: string,
    className?: string,
}) {
    return <span className={`${className} ${titleStyle}`}>
        {name}
    </span>;
}
