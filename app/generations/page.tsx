import SearchableList from "../components/SearchableList";
import { getGenerationList } from "../lib/api";
import GenerationListClient from "./GenerationListClient";

export default async function GenerationsPage() {
  const generations = await getGenerationList();

  return <GenerationListClient generations={generations} />;
}
