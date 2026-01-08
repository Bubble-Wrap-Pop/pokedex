import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BackButton from "../../components/BackButton";
import SearchableList from "../../components/SearchableList";
import { getLocation, getLocationAreas } from "../../lib/api";
import type { LocationData } from "../../lib/types";
import { formatName } from "../../lib/format";

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

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <h1 className="text-4xl font-bold mb-2 capitalize text-black dark:text-zinc-50">
          {formattedName}
        </h1>
        {location.region && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 capitalize">
            Region: {formatName(location.region.name)}
          </p>
        )}

        <div className="space-y-6">
          {locationAreas.map((area) => {
            const areaName = formatName(area.name);
            const pokemon = area.pokemon_encounters || [];

            return (
              <div
                key={area.name}
                className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800"
              >
                {pokemon.length > 0 ? (
                  <SearchableList
                    title={areaName}
                    items={pokemon.map((encounter) => ({
                      name: encounter.pokemon.name,
                    }))}
                    hrefPattern="/pokemon/{name}"
                    titleSize="medium"
                  />
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-zinc-50">
                      {areaName}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      No Pokemon found in this area
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {locationAreas.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-600 dark:text-zinc-400">
              No sub-areas found for this location
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}
