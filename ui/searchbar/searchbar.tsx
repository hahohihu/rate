import { fetchObjects } from "@/data/object";
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

export default function SearchBar(props: any) {
    const initOptions: DefaultOptionType = [];
    let [options, setOptions] = useState(initOptions);

    async function onSearch(value: string) {
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

    function onSelect(value: string) {

    }

    return (
        <Select
            showSearch
            placeholder="Search objects"
            filterOption={false}
            onSearch={onSearch}
            onSelect={onSelect}
            options={options}
            {...props}
        ></Select>
    );
}