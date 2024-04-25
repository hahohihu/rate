import { fetchObjects } from "@/data/object";
import { AutoComplete, Input } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar(props: any) {
    // Need this to dynamically display objects from DB
    let [options, setOptions] = useState<DefaultOptionType[]>([]);
    // Need this to clear shown value on select
    let [shown, setShown] = useState('');

    async function onEdit(value: string) {
        setShown(value);
        if (value) {
            let objects = await fetchObjects(value);
            setOptions(objects.map(object => {
                let year = object.prod_year ? `(${object.prod_year})` : '';
                return {
                    value: object.name,
                    label: `${object.name} ${year}`,
                    id: object.id
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
                router.push(`/object/${opt.id}`);
            }}
            options={options}
            {...props}
        >
            <Input.Search 
                placeholder="search objects" 
                enterButton
                onSearch={value => {
                    router.push(`/search?name=${value}`);
                }}
                />
        </AutoComplete>
    );
}