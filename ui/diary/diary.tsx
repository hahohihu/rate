import { fetchEntries } from '../../data/entry';
import './diary.css';
import { ratingColor } from "../../lib/utility";
import { Title } from '../text';

export default async function Diary() {
    let entries = await fetchEntries();
    let prevMonth: number;
    return (
        <table className="diary_table">
            <thead>
                <tr>
                    <td className="text-center">month</td>
                    <td className="text-center">date</td>
                    <td>name</td>
                    <td className="text-center">released</td>
                    <td className="text-center">rating</td>
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
                            <td className={`text-center text-sm font-extralight`}>{monthYear}</td>
                            <td className={`text-center text-sm font-extralight`}>{movie.watch_date.getDate()}</td>
                            <td><Title className="" object={movie}></Title>
                            </td>
                            <td className="text-center text-sm font-extralight">{movie.prod_year}</td>
                            <td className={"text-center font-light"} style={{ color: ratingColor(movie.rating) }}>{movie.rating}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
