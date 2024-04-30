import { addEntry, fetchEntry } from "@/data/entry";

export async function EntryAddForm({ ctx, className }: {
    ctx: {
        thingId: number,
        entryId?: number,
    },
    className?: string,
}) {
    let entry = ctx.entryId ? await fetchEntry(ctx.entryId) : undefined;
    const action = addEntry.bind(null, ctx.thingId);

    return (
        <form action={action} className={className}>
            <div>
                <div className="select-none">
                    <label htmlFor="rating">rating</label>
                    <input className="w-full" id="rating" type="range" min="-3" max="3" step="0.1" defaultValue="0" list="rating-values" />
                    <datalist id="rating-values" className="flex w-full justify-between text-center">
                        {
                            [-3, -2, -1, 0, 1, 2, 3].map(key => (<option key={key} className="w-2 p-0" value={key}>{key}</option>))
                        }
                    </datalist>
                </div>
            </div>
        </form>
    );
}
