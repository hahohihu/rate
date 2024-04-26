import Link from "next/link";

export function Title({ object, className }: {
    object: {
        name: string;
        id: number;
    },
    className?: string
}) {
    return <Link href={`/object/${object.id}`} className={`${className} action-link`}>
        {object.name}
    </Link>;
}
