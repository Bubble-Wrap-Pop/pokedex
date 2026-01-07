import SearchableList from "../components/SearchableList";

export default function LocationsPage() {
  return (
    <SearchableList
      title="Locations"
      apiUrl="https://pokeapi.co/api/v2/location?limit=1000"
      hrefPattern="/locations/{name}"
    />
  );
}
