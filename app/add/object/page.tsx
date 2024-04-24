import '../ui/forms.css';
import { addObject } from '@/app/data/object';

export default async function Home({
    searchParams
}: {
    searchParams?: {
        partial?: string;
    }
}) {
    return (
        <main>
            <form action={addObject} className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label htmlFor="media_name">Name</label>
                    <input id="media_name" name="media_name" defaultValue={searchParams?.partial} autoComplete="off"></input>
                    <label htmlFor="prod_year">Production Year</label>
                    <input type="number" step="1" id="prod_year" name="prod_year" autoComplete="off"></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </main >
    );
}
