import { ratingColor } from '@/lib/utility';
import Link from 'next/link';
import { DM_Mono } from 'next/font/google';

export const dmMono = DM_Mono({ subsets: ['latin'], weight: "300" });

const titleStyle = 'text-color-dominant font-normal';

export function ThingTitleLink({ name, thingId, className }: {
    name: string,
    thingId: number,
    className?: string,
}) {
    return (
        <Link href={`/thing/${thingId}`} className={`action-link ${className} ${titleStyle}`}>
            {name}
        </Link>
    );
}

export function ThingTitle({ name, className }: {
    name: string,
    className?: string,
}) {
    return (
        <span className={`${className} ${titleStyle}`}>
            {name}
        </span>
    );
}

export function StylizedRating({ rating, className }: {
    rating: number,
    className?: string
}) {
    let prefix = "";
    if (rating > 0) {
        prefix = "+";
    } else if (rating == 0) {
        prefix = "=";
    }
    return <span className={`${dmMono.className} ${className}`} style={{ color: ratingColor(rating) }}>
        {prefix + rating.toFixed(1)}
    </span>
}
