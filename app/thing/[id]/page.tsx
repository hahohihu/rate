import ThingInfo from '@/ui/thing/thing-info';
import Entries from '@/ui/thing/entries';
import styles from './layout.module.css';
import { EntryAddButton } from '@/ui/entry-editor/modal';

export default async function Home({ params }: { params: { id: number } }) {
    return (
        <main className={`p-4 ${styles.thing_page}`}>
            <ThingInfo id={params.id} />
            <section className={styles.entries}>
                <EntryAddButton ctx={{ thingId: params.id }} className={`${styles.add_entry} action-link`}>add a new entry</EntryAddButton>
                <Entries thingId={params.id} className="p-4" />
            </section>
        </main>
    );
}
