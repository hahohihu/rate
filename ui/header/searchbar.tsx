import { fetchThings } from "@/data/thing";
import { AutoComplete, Input } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ className }: { className: string }) {
    // Need this to dynamically display things from DB
    let [options, setOptions] = useState<DefaultOptionType[]>([]);
    // Need this to clear shown value on select
    let [shown, setShown] = useState('');

    async function onEdit(value: string) {
        setShown(value);
        if (value) {
            let things = await fetchThings(value);
            setOptions(things.map(thing => {
                let year = thing.prod_year ? `(${thing.prod_year})` : '';
                return {
                    value: thing.name,
                    label: `${thing.name} ${year}`,
                    id: thing.id
                }
            }));
        } else {
            setOptions([]);
        }
    }

    const router = useRouter();

    return (
        <AutoComplete
            backfill={true}
            onSearch={onEdit}
            value={shown}
            onSelect={(_, opt) => {
                setShown('')
                router.push(`/thing/${opt.id}`);
            }}
            options={options}
            className={className}
        >
            <Input.Search 
                placeholder="search things"
                enterButton
                variant="filled"
                onSearch={value => {
                    if (value != '') {
                        router.push(`/search?name=${value}`);
                    }
                }}
            />
        </AutoComplete>
    );
}