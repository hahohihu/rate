import { Thing } from '@/data/drizzle/schema';
import { fetchObjects } from '../../data/object';

export default async function Page({
  searchParams
}: {
  searchParams?: {
    name?: string;
  }
}) {
  const query = searchParams?.name || '';
  let matches: Thing[] = [];
  if (query) {
    matches = await fetchObjects(query);
  } else {
    matches = [];
  }

  return <div>
    TODO
  </div>;
}