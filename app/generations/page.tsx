import SearchableList from "../components/SearchableList";

export default function GenerationsPage() {
  return (
    <SearchableList
      title="Generations"
      apiUrl="https://pokeapi.co/api/v2/generation"
    />
  );
}
