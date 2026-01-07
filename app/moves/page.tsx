import SearchableList from "../components/SearchableList";

export default function MovesPage() {
  return (
    <SearchableList
      title="Moves"
      apiUrl="https://pokeapi.co/api/v2/move?limit=1000"
    />
  );
}
