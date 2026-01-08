import SearchableList from "../components/SearchableList";
import { getGenerationList } from "../lib/api";
import { formatGenerationName } from "../lib/format";
import { ITEMS_PER_PAGE } from "../lib/constants";

export default async function GenerationsPage() {
  const generations = await getGenerationList();

  return (
    <SearchableList
      title="Generations"
      items={generations}
      hrefPattern="/generations/{name}"
      formatName={formatGenerationName}
      itemsPerPage={ITEMS_PER_PAGE}
    />
  );
}
