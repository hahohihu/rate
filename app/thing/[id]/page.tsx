import ThingInfo from './thing-info';
import Entries from './entries';
import styles from './layout.module.css';
import { ButtonModal } from '@/ui/entry-editor/modal';
import { ThingHeader } from '@/ui/text';
import { EntryAddForm } from '@/ui/entry-editor/form';

export default async function Home({ params }: { params: { id: number } }) {
    return (
        <main className={`p-4 ${styles.thing_page}`}>
            <ThingInfo id={params.id} />
            <section className={styles.entries}>
                <ButtonModal button='add a new entry' className={`${styles.add_entry} action-link`}>
                    <ThingHeader thingId={params.id}></ThingHeader>
                    <EntryAddForm ctx={{ thingId: params.id }}></EntryAddForm>
                </ButtonModal>
                <Entries thingId={params.id} className="p-4" />
            </section>
        </main>
    );
}
