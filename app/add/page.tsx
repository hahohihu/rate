import SearchBar from "./ui/searchbar";
import { DbObject, fetchObjects } from "../lib/data";
import Link from "next/link";
import styles from "./ui/search.module.css";

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
    {query != '' ? (
      <div>
        <ul className={"p-2 overflow-y-auto " + styles.search_width + " " + styles.search_results}>
          {matches.map(obj =>
            <Link key={obj.id} className="w-full" href={"/add/entry?object=" + obj.id} >
              <li className={styles.object}>
                {obj.name + " (" + obj.prod_year + ")"}
              </li>
            </Link>
          )}
        </ul>
        <Link href={"/add/object?partial=" + query}>
          <div className={styles.add_object}>
            Add new object
          </div>
        </Link>
      </div>
    ) : null}
  </>
}
