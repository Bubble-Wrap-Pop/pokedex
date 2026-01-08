import { getPokemonList } from "../lib/api";
import { UI_CONFIG } from "../lib/constants";
import { generateDetailMetadata } from "../lib/metadata";
import PokemonList from "../components/PokemonList";

export const metadata = generateDetailMetadata(
  "pokemon",
  "Browse all Pokemon species in the Pokedex."
);

export default async function PokemonPage() {
  const pokemon = await getPokemonList();

  return (
    <PokemonList
      title="Pokemon"
      items={pokemon}
      hrefPattern="/pokemon/{name}"
      itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE}
    />
  );
}
