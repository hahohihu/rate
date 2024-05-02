import { Thing } from '@/data/drizzle/schema';
import { fetchThings } from '../../data/thing';
import { ThingTitle, ThingTitleLink } from '@/ui/text';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
  }
}) {
  const query = searchParams?.name || '';
  let matches: Thing[] = [];
  if (query) {
    matches = await fetchThings(query);
  } else {
    matches = [];
  }

  return (
    <main className="p-4">
      <div className="relative border p-5 min-w-40">
        <h1 className="absolute bg-color-middle px-1 -top-3">native</h1>
        <ul className="space-y-3">
          {
            matches.map(thing => {
              return <li key={thing.id}>
                <div className="flex gap-2 items-end">
                  <ThingTitleLink className="text-lg leading-none" name={thing.name} thingId={thing.id} />
                  <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
                </div>
              </li>;
            })
          }
        </ul>
      </div>
    </main>
  );
}
