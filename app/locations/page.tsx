import LocationList from "../components/LocationList";
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
    <LocationList
      title="Locations"
      items={locations}
      hrefPattern="/locations/{name}"
      itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE}
    />
  );
}
