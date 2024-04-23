import { addEntry } from "../lib/actions";

// const { name, prod_year, rating } = AddFormSchema.parse({
//   name: formData.get('name'),
//   prod_year: formData.get('prod_year'),
//   rating: formData.get('rating'),
// });

export default async function Home() {
  return (
    <main>
      <form action={addEntry} className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-y-2">
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
