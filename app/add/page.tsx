import './style.css';
import { addEntry } from "../lib/actions";

export default async function Home() {
  return (
    <main>
      <form action={addEntry} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="media_name">Name</label>
          <input id="media_name" name="media_name"></input>
          <label htmlFor="prod_year">Production Year</label>
          <input type="number" step="1" id="prod_year" name="prod_year"></input>
          <label htmlFor="rating">Rating</label>
          <input type="number" step="0.01" id="rating" name="rating"></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main >
  );
}
