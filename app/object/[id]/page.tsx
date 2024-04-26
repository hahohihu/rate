import ObjectInfo from "./object-info";
import Entries from "./entries";
import styles from './layout.module.css';
import Link from "next/link";

export default async function Home({ params }: { params: { id: number } }) {
    return (
        <main className={`p-4 ${styles.object_page}`}>
            <ObjectInfo id={params.id} />
            <div className={styles.entries}>
                <button className={`${styles.add_entry} action-link`}>
                    add a new entry
                </button>
                <Entries objectId={params.id} className="p-4" />
            </div>
        </main >
    );
}
