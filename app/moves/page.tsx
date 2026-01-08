import { getMoveList } from "../lib/api";
import { UI_CONFIG } from "../lib/constants";
import { generateDetailMetadata } from "../lib/metadata";
import MovesList from "../components/MovesList";

export const metadata = generateDetailMetadata(
  "move",
  "Browse all Pokemon moves in the Pokedex."
);

export default async function MovesPage() {
  const moves = await getMoveList();

  return (
    <MovesList
      title="Moves"
      items={moves}
      hrefPattern="/moves/{name}"
      itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE}
    />
  );
}
