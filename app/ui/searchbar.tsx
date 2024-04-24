'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
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
        <fieldset className="flex flex-col">
            <input
                id="search"
                name="search"
                placeholder="Search"
                onChange={e => handleSearch(e.target.value)}
                defaultValue={searchParams.get("object")?.toString()}
            />
        </fieldset>
    );
}
