import SearchableList from "../components/SearchableList";
import { getPokemonList } from "../lib/api";

export default async function PokemonPage() {
  const pokemon = await getPokemonList();

  return (
    <SearchableList
      title="Pokemon"
      items={pokemon}
      hrefPattern="/pokemon/{name}"
    />
  );
}
