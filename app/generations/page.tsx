import { getGenerationList } from "../lib/api";
import { UI_CONFIG } from "../lib/constants";
import { generateDetailMetadata } from "../lib/metadata";
import SearchableList from "../components/SearchableList";

export const metadata = generateDetailMetadata(
  "generation",
  "Browse all Pokemon generations in the Pokedex."
);

export default async function GenerationsPage() {
  const generations = await getGenerationList();

  return (
    <SearchableList
      title="Generations"
      items={generations}
      hrefPattern="/generations/{name}"
      itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE}
      formatType="generation"
      colorType="generation"
    />
  );
}
