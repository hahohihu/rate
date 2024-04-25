import { getObject } from "@/data/object";
import ObjectInfo from "./object-info";

export default async function Home({ params }: { params: { id: number } }) {
    return (
        <main className="p-4">
            <ObjectInfo id={params.id} />
        </main >
    );
}
