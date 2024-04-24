import { getObject } from '../lib/data';
import '../ui/forms.css';
import { addEntry } from "../lib/actions";

export default async function Home({
    searchParams
}: {
    searchParams: {
        object: string;
    }
}) {
    const obj = await getObject(Number(searchParams.object));
    const submitForm = addEntry.bind(null, obj.id);
    return (
        <main>
            <div className="flex gap-1">
                <h1>{obj.name}</h1>
                <h2>({obj.prod_year})</h2>
            </div>
            <form action={submitForm} className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label htmlFor="rating">Rating</label>
                    <input type="number" step="0.01" id="rating" name="rating" autoComplete="off"></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </main >
    );
}
