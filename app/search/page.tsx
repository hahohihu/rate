import { Provider, ExternThingDescription } from '@/data/provider/interface';
import { ProviderView } from '@/ui/provider/provider';
import { PROVIDERS } from '@/data/provider/all';


async function ProviderList(provider: Provider, query: string) {
    let things = await provider.searchThings(query);
    if (things.length == 0) {
        return <></>
    }
    return <ProviderView matches={{ provider_name: provider.name, things }} />
}

export default async function Page({
    searchParams,
}: {
  searchParams?: {
    name?: string;
  }
}) {
    const query = searchParams?.name || '';
    if (query == '') {
        throw new Error("Empty search - display this a bit nicer");
    }

    return (
        <main className="p-4 space-y-4">
            {PROVIDERS.map(provider => ProviderList(provider, query))}
        </main>
    );
}
