import { PROVIDERS } from '@/data/provider/all';
import { NativeSearchView } from '@/ui/provider/native';
import { ProviderList } from '@/ui/provider/extern';

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
        <main className="p-8 flex flex-col gap-6">
            <NativeSearchView query={query} />
            {PROVIDERS.map(provider => <ProviderList key={provider.name} provider={provider} query={query} />)}
        </main>
    );
}
