import { notFound } from "next/navigation";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import SearchableList from "../../components/SearchableList";
import { getGeneration } from "../../lib/api";
import type { GenerationData } from "../../lib/types";
import { formatGenerationName, formatName } from "../../lib/format";
import { ITEMS_PER_PAGE_DETAIL } from "../../lib/constants";
import type { Metadata } from "next";

interface GenerationDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: GenerationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatGenerationName(name);
  return {
    title: `Pokedex – ${formattedName}`,
    description: `${formattedName} details and Pokémon species.`,
  };
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
              itemsPerPage={ITEMS_PER_PAGE_DETAIL}
            />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-zinc-50">
                Pokemon Species
              </h2>
              <EmptyState message="No Pokemon species found" />
            </>
          )}
        </DetailCard>
      </DetailPageLayout>
    );
  } catch (error) {
    notFound();
  }
}
