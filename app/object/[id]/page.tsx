import { getObject } from "@/data/object";

export default async function Home({ params }: { params: { id: number } }) {
    let object = await getObject(params.id);

    return (
        <main className="p-4">
            {object.name}
        </main >
    );
}
