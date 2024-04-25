import { DbObject, fetchObjects } from '../../data/object';
import Link from "next/link";
import styles from "@/ui/searchbar/search.module.css";

export default async function Page({
  searchParams
}: {
  searchParams?: {
    name?: string;
  }
}) {
  const query = searchParams?.name || '';
  let matches: DbObject[] = [];
  if (query) {
    matches = await fetchObjects(query);
  } else {
    matches = [];
  }

  return <div>
    TODO
  </div>;
}