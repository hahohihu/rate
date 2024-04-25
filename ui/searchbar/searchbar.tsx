'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "antd";

export default function SearchBar(props: any) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("object", term);
        } else {
            params.delete("object");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Input 
            placeholder="Search object"
            onChange={e => handleSearch(e.target.value)}
            defaultValue={searchParams.get("object")?.toString()}
            {...props}
            />
    );
}
