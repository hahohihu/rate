import { fetchObjects } from "@/data/object";
import { AutoComplete, Input, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

export default function SearchBar(props: any) {
    let [options, setOptions] = useState<DefaultOptionType[]>([]);

    async function onEdit(value: string) {
        if (value) {
            let objects = await fetchObjects(value);
            setOptions(objects.map(object => {
                let year = object.prod_year ? `(${object.prod_year})` : '';
                return {
                    value: object.id,
                    label: `${object.name} ${year}`
                }
            }));
        } else {
            setOptions([]);
        }
    }

    function onSelect(value: number) {
        console.log(value);
    }

    function onSearch(value: string) {
        console.log(value);
    }

    return (
        <AutoComplete
            onSearch={onEdit}
            onSelect={onSelect}
            options={options}
            {...props}
        >
            <Input.Search 
                placeholder="search objects" 
                enterButton
                onSearch={onSearch}
                />
        </AutoComplete>
    );
}