'use client';

import Link from "next/link";
import { usePathname } from "next/navigation"
import styles from '../css/nav.module.css';
import clsx from "clsx";

const links = [
    { name: "Diary", href: "/" },
    { name: "Add", href: "/add" },
];

export default function NavBar() {
    const pathname = usePathname();
    return (
        <div className="bg-flair flex m-4 rounded px-2">
            {links.map(link => (
                <Link key={link.name} href={link.href} className={clsx("py-2 px-4", {
                    'active-nav': pathname == link.href
                })}>
                    {link.name}
                </Link>
            ))}
        </div>
    );
}
