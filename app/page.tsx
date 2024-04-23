import Image from "next/image";
import { fetchMovies } from "./lib/data";
import './diary.css';

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function pickHex(color1: number[], color2: number[], weight: number) {
  var w1 = weight;
  var w2 = 1 - w1;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
  Math.round(color1[1] * w1 + color2[1] * w2),
  Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function ratingColor(rating: number) {
  const MAX_RATING = 2.5;
  rating = clamp(rating, -MAX_RATING, MAX_RATING);
  const WHITE = [120, 120, 120];
  const RED = [240, 0, 0];
  const GREEN = [0, 240, 0];
  let color;
  if (rating > 0) {
    color = pickHex(GREEN, WHITE, rating / MAX_RATING);
  } else {
    color = pickHex(RED, WHITE, rating / -MAX_RATING);
  }
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export default async function Home() {
  let movies = await fetchMovies();
  let prevMonth: number;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
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
              monthYear = movie.watch.toLocaleString('default', { month: 'short' });
              prevMonth = currentMonth;
            }
            return (
              <tr>
                <td>{monthYear}</td>
                <td>{movie.watch.getDate()}</td>
                <td>{movie.name}</td>
                <td>{movie.release}</td>
                <td style={{color: ratingColor(movie.rating)}}>{movie.rating}</td>
              </tr>
        );
          })}
      </tbody>
    </table>
    </main >
  );
}
