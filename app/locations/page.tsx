import SearchableList from "../components/SearchableList";
import { getLocationList } from "../lib/api";
import { ITEMS_PER_PAGE } from "../lib/constants";

export default async function LocationsPage() {
  const locations = await getLocationList();

  return (
    <SearchableList
      title="Locations"
      items={locations}
      hrefPattern="/locations/{name}"
      itemsPerPage={ITEMS_PER_PAGE}
    />
  );
}
