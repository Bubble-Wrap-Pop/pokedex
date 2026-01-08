import SearchableList from "../components/SearchableList";
import { getMoveList } from "../lib/api";
import { ITEMS_PER_PAGE } from "../lib/constants";

export default async function MovesPage() {
  const moves = await getMoveList();

  return (
    <SearchableList
      title="Moves"
      items={moves}
      hrefPattern="/moves/{name}"
      itemsPerPage={ITEMS_PER_PAGE}
    />
  );
}
