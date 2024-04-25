'use client';

import SearchBar from "@/ui/searchbar/searchbar";
import logo from '@/public/logo.svg';
import Image from 'next/image'
import Link from "next/link";

// {links.map(link => (
//     <Link key={link.name} href={link.href} className={clsx("py-2 px-4", {
//         'active-nav': pathname == link.href
//     })}>
//         {link.name}
//     </Link>
// ))}

export default function Header() {
    return (
        <div className="flex h-10">
            <Link href="/">
                <Image src={logo} alt="home" className="h-full w-auto"></Image>
            </Link>
            <SearchBar/>
        </div>
    );
}
