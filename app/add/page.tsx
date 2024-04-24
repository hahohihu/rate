import SearchBar from "../ui/searchbar";
import { DbObject, fetchObjects } from "../lib/data";
import Link from "next/link";

export default async function Page({
  searchParams
}: {
  searchParams?: {
    object?: string;
  }
}) {
  const query = searchParams?.object || '';
  let matches: DbObject[] = [];
  if (query) {
    matches = await fetchObjects(query);
  } else {
    matches = [];
  }

  return <>
    <SearchBar />
    <ul>
      {matches.map(obj =>
        <li key={obj.id}>
          <Link href={"/add/entry?object=" + obj.id} >
            {obj.name + " (" + obj.prod_year + ")"}
          </Link>
        </li>
      )}
    </ul>
  </>
}
