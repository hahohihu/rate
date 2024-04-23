import Image from "next/image";
import { fetchMovies } from "./lib/data";
import './diary.css';

export default async function Home() {
  let movies = await fetchMovies();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table>
        <thead>
          <tr>
            {["Name", "Released", "Rating"].map(header => (<td>{header}</td>))}
          </tr>
        </thead>
        <tbody>
          {movies?.map(movie => (
            <tr>
              <td>{movie.name}</td>
              <td>{movie.release}</td>
              <td>{movie.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
