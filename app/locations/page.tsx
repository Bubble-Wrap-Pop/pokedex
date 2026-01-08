import SearchableList from "../components/SearchableList";
import { getLocationList } from "../lib/api";

export default async function LocationsPage() {
  const locations = await getLocationList();

  return (
    <SearchableList
      title="Locations"
      items={locations}
      hrefPattern="/locations/{name}"
    />
  );
}
