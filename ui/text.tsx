import Link from "next/link";

export function Title({ name, objectId, className }: {
    name: string,
    objectId: number,
    className?: string
}) {
    return <Link href={`/object/${objectId}`} className={`${className} action-link`}>
        {name}
    </Link>;
}
