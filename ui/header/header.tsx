'use client';

import SearchBar from "@/ui/searchbar/searchbar";
import logo from '@/public/logo.svg';
import Image from 'next/image'
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex h-12 bg-h1-c w-full p-2">
            <Link href="/">
                <Image src={logo} alt="home" className="h-full w-auto"></Image>
            </Link>
            <SearchBar className="max-w-lg ml-auto" />
        </div>
    );
}
