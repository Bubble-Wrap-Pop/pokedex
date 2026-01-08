import SearchableList from "../components/SearchableList";
import { getMoveList } from "../lib/api";

export default async function MovesPage() {
  const moves = await getMoveList();

  return (
    <SearchableList
      title="Moves"
      items={moves}
      hrefPattern="/moves/{name}"
    />
  );
}
