import ThingInfo from "./thing-info";
import Entries from "./entries";
import styles from './layout.module.css';
import Link from "next/link";

export default async function Home({ params }: { params: { id: number } }) {
    return (
        <main className={`p-4 ${styles.thing_page}`}>
            <ThingInfo id={params.id} />
            <div className={styles.entries}>
                <button className={`${styles.add_entry} action-link`}>
                    add a new entry
                </button>
                <Entries thingId={params.id} className="p-4" />
            </div>
        </main >
    );
}
