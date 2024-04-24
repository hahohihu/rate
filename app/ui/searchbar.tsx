'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/css/search.module.css";

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
        <fieldset className={"flex flex-col " + styles.search_width}>
            <input
                id="search"
                name="search"
                placeholder="Search"
                autoComplete="off"
                onChange={e => handleSearch(e.target.value)}
                defaultValue={searchParams.get("object")?.toString()}
            />
        </fieldset>
    );
}
