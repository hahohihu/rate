import { Thing } from '@/data/drizzle/schema';
import { fetchThings } from '../../data/thing';

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
        matches = await fetchThings(query);
    } else {
        matches = [];
    }

    return <div>
    TODO
    </div>;
}