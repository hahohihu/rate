'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.svg';
import SearchBar from '@/ui/header/searchbar';

export default function Header() {
    return (
        <div className="bg-color-top w-full">
            <div className="flex gap-2 h-full max-w-5xl ml-auto mr-auto p-2">
                <Link href="/" className="min-h-full w-auto">
                    <Image src={logo} alt="home" className="min-h-full min-w-max" />
                </Link>
                <SearchBar className="w-full max-w-lg !ml-auto" />
            </div>
        </div>
    );
}
