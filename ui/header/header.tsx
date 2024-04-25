'use client';

import SearchBar from "../searchbar/searchbar";
import logo from '@/public/logo.svg';
import Image from 'next/image'

export default function Header() {
    return (
        <div className="flex h-10">
            <Image src={logo} alt="home" className="h-full w-auto"></Image>
            <SearchBar/>
        </div>
    );
}
