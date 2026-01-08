import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import SearchableList from "../../components/SearchableList";
import { getLocation, getLocationAreas } from "../../lib/api";
import type { LocationData } from "../../lib/types";
import { formatName } from "../../lib/format";
import { ITEMS_PER_PAGE_DETAIL } from "../../lib/constants";

interface LocationDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: LocationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatName(name);
  return {
    title: `Pokedex – ${formattedName}`,
    description: `${formattedName} encounter areas and Pokémon.`,
  };
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { name: locationName } = await params;

  try {
    const location = await getLocation(locationName);
    const areaUrls = location.areas.map((area) => area.url);
    const locationAreas = areaUrls.length > 0 ? await getLocationAreas(areaUrls) : [];

    const formattedName = formatName(location.name);
    const subtitle = location.region
      ? `Region: ${formatName(location.region.name)}`
      : undefined;

    return (
      <DetailPageLayout title={formattedName} subtitle={subtitle}>
        <div className="space-y-6">
          {locationAreas.map((area) => {
            const areaName = formatName(area.name);
            const pokemon = area.pokemon_encounters || [];

            return (
              <DetailCard key={area.name}>
                {pokemon.length > 0 ? (
                  <SearchableList
                    title={areaName}
                    items={pokemon.map((encounter) => ({
                      name: encounter.pokemon.name,
                    }))}
                    hrefPattern="/pokemon/{name}"
                    titleSize="medium"
                    itemsPerPage={ITEMS_PER_PAGE_DETAIL}
                  />
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-zinc-50">
                      {areaName}
                    </h2>
                    <EmptyState message="No Pokemon found in this area" />
                  </>
                )}
              </DetailCard>
            );
          })}
        </div>

        {locationAreas.length === 0 && (
          <DetailCard>
            <EmptyState message="No sub-areas found for this location" />
          </DetailCard>
        )}
      </DetailPageLayout>
    );
  } catch (error) {
    notFound();
  }
}
