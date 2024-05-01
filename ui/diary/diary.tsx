import { fetchEntries } from '../../data/entry';
import './diary.css';
import { ratingColor } from '../../lib/utility';
import { StylizedRating, ThingTitleLink } from '../text';

export default async function Diary() {
    const entries = await fetchEntries();
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
                {entries?.map((fullEntry) => {
                    const entry = fullEntry.entries;
                    const thing = fullEntry.things;
                    const currentMonth = entry.watch_date.getMonth();
                    let monthYear;
                    if (currentMonth != prevMonth) {
                        monthYear = entry.watch_date.toLocaleString('default', { month: 'short' });
                        prevMonth = currentMonth;
                    }
                    return (
                        <tr key={entry.id}>
                            <td className="text-center text-sm font-extralight">{monthYear}</td>
                            <td className="text-center text-sm font-extralight">{entry.watch_date.getDate()}</td>
                            <td><ThingTitleLink name={thing.name} thingId={entry.thing_id} className="action-link" /></td>
                            <td className="text-center text-sm font-extralight">{thing.prod_year}</td>
                            <td className="text-center font-light text-sm">
                                <StylizedRating rating={entry.rating}/>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
