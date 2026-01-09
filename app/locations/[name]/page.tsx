import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import EmptyStateCard from "../../components/EmptyStateCard";
import SearchableList from "../../components/SearchableList";
import { getLocation, getLocationAreas } from "../../lib/api";
import { formatName } from "../../lib/format";
import { UI_CONFIG } from "../../lib/constants";
import { generateDetailMetadata } from "../../lib/metadata";
import { getRegionColor } from "../../lib/colors";

interface LocationDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: LocationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatName(name);
  return generateDetailMetadata("location", `${formattedName} encounter areas and Pokémon.`, name);
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { name: locationName } = await params;

  try {
    const location = await getLocation(locationName);
    const areaUrls = location.areas.map((area) => area.url);
    // Gracefully handle errors when fetching location areas
    const locationAreas =
      areaUrls.length > 0
        ? await getLocationAreas(areaUrls).catch(() => [])
        : [];

    const formattedName = formatName(location.name);
    const subtitle = location.region
      ? `Region: ${formatName(location.region.name)}`
      : undefined;
    const regionColor = getRegionColor(location.region?.name);

    return (
      <DetailPageLayout title={formattedName} subtitle={subtitle} accentColor={regionColor}>
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
                    itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE_DETAIL}
                    colorType="pokemon"
                  />
                ) : (
                  <EmptyStateCard title={areaName} message="No Pokemon found in this area" />
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
  } catch {
    notFound();
  }
}
