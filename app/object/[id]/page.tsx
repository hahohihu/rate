import ObjectInfo from "./object-info";
import Entries from "./entries";
import styles from './layout.module.css';

export default async function Home({ params }: { params: { id: number } }) {
    return (
        <main className={`p-4 ${styles.object_page}`}>
            <ObjectInfo id={params.id} />
            <div className={styles.entries}>
                <Entries objectId={params.id}/>
            </div>
        </main >
    );
}
