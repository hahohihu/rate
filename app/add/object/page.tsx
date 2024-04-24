import '@/app/css/forms.css';
import { addObject } from "@/app/lib/actions";

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
                    <input id="media_name" name="media_name" defaultValue={searchParams?.partial}></input>
                    <label htmlFor="prod_year">Production Year</label>
                    <input type="number" step="1" id="prod_year" name="prod_year"></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </main >
    );
}
