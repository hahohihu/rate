import Image from "next/image";
import { fetchMovies } from "./lib/data";
import './diary.css';

export default async function Home() {
  let movies = await fetchMovies();
  let prevMonth: number;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table>
        <thead>
          <tr>
            {["Month", "Date", "Name", "Released", "Rating"].map(header => (<td>{header}</td>))}
          </tr>
        </thead>
        <tbody>
          {movies?.map(movie => {
            let currentMonth = movie.watch.getMonth();
            let monthYear;
            if (currentMonth != prevMonth) {
              monthYear = movie.watch.toLocaleString('default', { month: 'long' });
              prevMonth = currentMonth;
            }
            return (
              <tr>
                <td>{monthYear}</td>
                <td>{movie.watch.getDate()}</td>
                <td>{movie.name}</td>
                <td>{movie.release}</td>
                <td>{movie.rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
