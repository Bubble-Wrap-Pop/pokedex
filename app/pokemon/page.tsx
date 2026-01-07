import SearchableList from "../components/SearchableList";

export default function PokemonPage() {
  return (
    <SearchableList
      title="Pokemon"
      apiUrl="https://pokeapi.co/api/v2/pokemon?limit=1000"
    />
  );
}
