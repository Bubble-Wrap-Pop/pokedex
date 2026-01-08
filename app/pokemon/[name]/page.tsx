import { notFound } from "next/navigation";
import Image from "next/image";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import SearchableList from "../../components/SearchableList";
import { getPokemon, getPokemonLocations } from "../../lib/api";
import type { PokemonData } from "../../lib/types";
import { formatName } from "../../lib/format";
import { ITEMS_PER_PAGE_DETAIL, MAX_STAT_VALUE, SPRITE_SIZE } from "../../lib/constants";
import type { Metadata } from "next";

interface PokemonDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PokemonDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatName(name);
  return {
    title: `Pokedex – ${formattedName}`,
    description: `${formattedName} details, stats, moves, and encounter locations.`,
  };
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { name: pokemonName } = await params;

  try {
    const [pokemon, locations] = await Promise.all([
      getPokemon(pokemonName),
      getPokemonLocations(pokemonName).catch(() => []),
    ]);

    const formattedName = formatName(pokemon.name);

    return (
      <DetailPageLayout title={formattedName}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Sprites */}
          <DetailCard title="Sprites">
            <div className="grid grid-cols-2 gap-4" role="group" aria-label="Pokemon sprites">
              {/* Normal Sprite */}
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                  Normal
                </h3>
                {pokemon.sprites.front_default ? (
                  <div className="w-40 h-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <Image
                      src={pokemon.sprites.front_default}
                      alt={`${formattedName} normal sprite`}
                      width={SPRITE_SIZE}
                      height={SPRITE_SIZE}
                      className="w-full h-full object-contain"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div
                    className="w-40 h-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center"
                    role="img"
                    aria-label="Normal sprite not available"
                  >
                    <p className="text-xs text-zinc-400">Not available</p>
                  </div>
                )}
              </div>
              {/* Shiny Sprite */}
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                  Shiny
                </h3>
                {pokemon.sprites.front_shiny ? (
                  <div className="w-40 h-40 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-600 flex items-center justify-center p-4 hover:border-yellow-400 dark:hover:border-yellow-500 transition-colors shadow-sm">
                    <Image
                      src={pokemon.sprites.front_shiny}
                      alt={`${formattedName} shiny sprite`}
                      width={SPRITE_SIZE}
                      height={SPRITE_SIZE}
                      className="w-full h-full object-contain"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div
                    className="w-40 h-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 flex items-center justify-center"
                    role="img"
                    aria-label="Shiny sprite not available"
                  >
                    <p className="text-xs text-zinc-400">Not available</p>
                  </div>
                )}
              </div>
            </div>
          </DetailCard>

          {/* Stats */}
          <DetailCard title="Stats">
            <div className="space-y-3" role="list" aria-label="Pokemon statistics">
              {pokemon.stats.map((stat) => {
                const statName = formatName(stat.stat.name);
                const statPercentage = Math.min((stat.base_stat / MAX_STAT_VALUE) * 100, 100);
                return (
                  <div key={stat.stat.name} role="listitem">
                    <div className="flex justify-between mb-1">
                      <span className="capitalize text-black dark:text-zinc-50" id={`stat-${stat.stat.name}`}>
                        {statName}
                      </span>
                      <span
                        className="text-zinc-600 dark:text-zinc-400"
                        aria-label={`${statName} value: ${stat.base_stat}`}
                      >
                        {stat.base_stat}
                      </span>
                    </div>
                    <div
                      className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2"
                      role="progressbar"
                      aria-valuenow={stat.base_stat}
                      aria-valuemin={0}
                      aria-valuemax={MAX_STAT_VALUE}
                      aria-labelledby={`stat-${stat.stat.name}`}
                    >
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${statPercentage}%`,
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </DetailCard>
        </div>

        {/* Locations */}
        <DetailCard className="mb-8">
          {locations.length > 0 ? (
            <SearchableList
              title="Locations"
              items={locations.map((name) => ({ name }))}
              hrefPattern="/locations/{name}"
              titleSize="medium"
              itemsPerPage={ITEMS_PER_PAGE_DETAIL}
            />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
                Locations
              </h2>
              <EmptyState message="No locations found" />
            </>
          )}
        </DetailCard>

        {/* Moves */}
        <DetailCard>
          {pokemon.moves.length > 0 ? (
            <SearchableList
              title="Moves"
              items={pokemon.moves.map((move) => ({ name: move.move.name }))}
              hrefPattern="/moves/{name}"
              titleSize="medium"
              itemsPerPage={ITEMS_PER_PAGE_DETAIL}
            />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
                Moves
              </h2>
              <EmptyState message="No moves found" />
            </>
          )}
        </DetailCard>
      </DetailPageLayout>
    );
  } catch (error) {
    notFound();
  }
}
