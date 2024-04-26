import { AutoComplete, Input } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchThings } from '@/data/thing';

export default function SearchBar({ className }: { className: string }) {
    // Need this to dynamically display things from DB
    const [options, setOptions] = useState<DefaultOptionType[]>([]);
    // Need this to clear shown value on select
    const [shown, setShown] = useState('');

    async function onEdit(value: string) {
        setShown(value);
        if (value) {
            const things = await fetchThings(value);
            setOptions(things.map((thing) => {
                const year = thing.prod_year ? `(${thing.prod_year})` : '';
                return {
                    value: thing.name,
                    label: `${thing.name} ${year}`,
                    id: thing.id,
                };
            }));
        } else {
            setOptions([]);
        }
    }

    const router = useRouter();

    return (
        <AutoComplete
            backfill
            onSearch={onEdit}
            value={shown}
            onSelect={(_, opt) => {
                setShown('');
                router.push(`/thing/${opt.id}`);
            }}
            options={options}
            className={className}
        >
            <Input.Search
                placeholder="search things"
                enterButton
                variant="filled"
                onSearch={(value) => {
                    if (value != '') {
                        router.push(`/search?name=${value}`);
                    }
                }}
            />
        </AutoComplete>
    );
}
