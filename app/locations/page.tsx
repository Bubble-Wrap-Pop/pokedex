import SearchableList from "../components/SearchableList";
import { getLocationList } from "../lib/api";
import { UI_CONFIG } from "../lib/constants";
import { generateDetailMetadata } from "../lib/metadata";

export const metadata = generateDetailMetadata(
  "location",
  "Browse all Pokemon locations in the Pokedex."
);

export default async function LocationsPage() {
  const locations = await getLocationList();

  return (
    <SearchableList
      title="Locations"
      items={locations}
      hrefPattern="/locations/{name}"
      itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE}
    />
  );
}
