import { notFound } from "next/navigation";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyStateCard from "../../components/EmptyStateCard";
import SearchableList from "../../components/SearchableList";
import { getGeneration } from "../../lib/api";
import { formatGenerationName, formatName } from "../../lib/format";
import { UI_CONFIG } from "../../lib/constants";
import { generateDetailMetadata } from "../../lib/metadata";
import type { Metadata } from "next";

interface GenerationDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: GenerationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatGenerationName(name);
  return generateDetailMetadata("generation", `${formattedName} details and Pokémon species.`, name);
}

export default async function GenerationDetailPage({ params }: GenerationDetailPageProps) {
  const { name: generationName } = await params;

  try {
    const generation = await getGeneration(generationName);
    const formattedName = formatGenerationName(generation.name);
    const subtitle = generation.main_region
      ? `Main Region: ${formatName(generation.main_region.name)}`
      : undefined;

    return (
      <DetailPageLayout title={formattedName} subtitle={subtitle}>
        {/* Pokemon Species */}
        <DetailCard>
          {generation.pokemon_species && generation.pokemon_species.length > 0 ? (
            <SearchableList
              title="Pokemon Species"
              items={generation.pokemon_species.map((species) => ({
                name: species.name,
              }))}
              hrefPattern="/pokemon/{name}"
              titleSize="medium"
              itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE_DETAIL}
            />
          ) : (
            <EmptyStateCard title="Pokemon Species" message="No Pokemon species found" />
          )}
        </DetailCard>
      </DetailPageLayout>
    );
  } catch {
    notFound();
  }
}
