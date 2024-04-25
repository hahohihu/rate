import { fetchEntries } from '../../data/entry';
import './diary.css';
import { ratingColor } from "../../lib/utility";

export default async function Diary() {
    let entries = await fetchEntries();
    let prevMonth: number;
    return (
        <table className="diary_table">
            <thead>
                <tr>
                    <td className="text-center">Month</td>
                    <td className="text-center">Date</td>
                    <td>Name</td>
                    <td className="text-center">Released</td>
                    <td className="text-center">Rating</td>
                </tr>
            </thead>
            <tbody>
                {entries?.map(movie => {
                    let currentMonth = movie.watch_date.getMonth();
                    let monthYear;
                    if (currentMonth != prevMonth) {
                        monthYear = movie.watch_date.toLocaleString('default', { month: 'short' });
                        prevMonth = currentMonth;
                    }
                    return (
                        <tr key={movie.id}>
                            <td className="text-center">{monthYear}</td>
                            <td className="text-center">{movie.watch_date.getDate()}</td>
                            <td>{movie.name}</td>
                            <td className="text-center text-sm">{movie.prod_year}</td>
                            <td className="text-center" style={{ color: ratingColor(movie.rating) }}>{movie.rating}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
