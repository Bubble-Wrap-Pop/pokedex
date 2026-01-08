import SearchableList from "../components/SearchableList";
import { getPokemonList } from "../lib/api";
import { ITEMS_PER_PAGE } from "../lib/constants";

export default async function PokemonPage() {
  const pokemon = await getPokemonList();

  return (
    <SearchableList
      title="Pokemon"
      items={pokemon}
      hrefPattern="/pokemon/{name}"
      itemsPerPage={ITEMS_PER_PAGE}
    />
  );
}
