import ObjectInfo from "./object-info";
import Entries from "./entries";
import styles from './layout.module.css';
import Link from "next/link";

export default async function Home({ params }: { params: { id: number } }) {
    return (
        <main className={`p-4 ${styles.object_page}`}>
            <ObjectInfo id={params.id} />
            <div className={styles.entries}>
                <Link href={`/add/${params.id}`} className="action-link" >
                    <div className={styles.add_entry}>
                        add a new entry
                    </div>
                </Link>
                <Entries objectId={params.id}/>
            </div>
        </main >
    );
}
