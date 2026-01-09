import { notFound } from "next/navigation";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import SearchableList from "../../components/SearchableList";
import { getGeneration } from "../../lib/api";
import { formatName } from "../../lib/format";
import { UI_CONFIG } from "../../lib/constants";
import { generateDetailMetadata } from "../../lib/metadata";
import { getGenerationColor } from "../../lib/colors";
import type { Metadata } from "next";
import type { DetailPageParams } from "../../lib/types";

interface GenerationDetailPageProps extends DetailPageParams {}

export async function generateMetadata({ params }: GenerationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatName(name);
  return generateDetailMetadata("generation", `${formattedName} details and Pokémon species.`, name);
}

export default async function GenerationDetailPage({ params }: GenerationDetailPageProps) {
  const { name: generationName } = await params;

  try {
    const generation = await getGeneration(generationName);
    const formattedName = formatName(generation.name);
    const subtitle = generation.main_region
      ? `Main Region: ${formatName(generation.main_region.name)}`
      : undefined;
    const generationColor = getGenerationColor(generation.name);

    return (
      <DetailPageLayout title={formattedName} subtitle={subtitle} accentColor={generationColor}>
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
              colorType="pokemon"
            />
          ) : (
            <EmptyState title="Pokemon Species" message="No Pokemon species found" />
          )}
        </DetailCard>
      </DetailPageLayout>
    );
  } catch {
    notFound();
  }
}
