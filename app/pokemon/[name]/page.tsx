import { notFound } from "next/navigation";
import Image from "next/image";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import SearchableList from "../../components/SearchableList";
import { getPokemon, getPokemonLocations } from "../../lib/api";
import { formatName } from "../../lib/format";
import { UI_CONFIG } from "../../lib/constants";
import { generateDetailMetadata } from "../../lib/metadata";
import { getMoveTypeColor, getPokemonColor } from "../../lib/colors";
import type { DetailPageParams } from "../../lib/types";
import type { Metadata } from "next";

interface PokemonDetailPageProps extends DetailPageParams {}

export async function generateMetadata({ params }: PokemonDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatName(name);
  return generateDetailMetadata("pokemon", `${formattedName} details, abilities, stats, moves, and encounter locations.`, name);
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { name: pokemonName } = await params;

  try {
    // Fetch pokemon data, with graceful error handling for locations
    const [pokemon, locations] = await Promise.all([
      getPokemon(pokemonName),
      getPokemonLocations(pokemonName).catch(() => [] as string[]),
    ]);

    const formattedName = formatName(pokemon.name);
    const pokemonColor = getPokemonColor(pokemon.types);

    return (
      <DetailPageLayout title={formattedName} accentColor={pokemonColor}>
        {/* Types */}
        <DetailCard title="Types" className="mb-8">
          <div className="flex flex-wrap gap-3">
            {pokemon.types.length > 0 ? (
              pokemon.types.map((typeEntry) => {
                const typeName = typeEntry.type.name;
                const typeColor = getMoveTypeColor(typeName);
                return (
                  <div
                    key={typeName}
                    className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-br ${typeColor} text-white font-semibold shadow-md`}
                  >
                    {formatName(typeName)}
                  </div>
                );
              })
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">No types available</p>
            )}
          </div>
        </DetailCard>

        {/* Abilities */}
        <DetailCard title="Abilities" className="mb-8">
          <div className="space-y-3">
            {pokemon.abilities && pokemon.abilities.length > 0 ? (
              pokemon.abilities
                .sort((a, b) => {
                  // Sort by slot, then hidden abilities last
                  if (a.is_hidden !== b.is_hidden) {
                    return a.is_hidden ? 1 : -1;
                  }
                  return a.slot - b.slot;
                })
                .map((abilityEntry) => {
                  const abilityName = formatName(abilityEntry.ability.name);
                  return (
                    <div
                      key={abilityEntry.ability.name}
                      className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
                    >
                      <span className="text-lg font-semibold text-black dark:text-zinc-50">
                        {abilityName}
                      </span>
                      {abilityEntry.is_hidden && (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                  );
                })
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">No abilities available</p>
            )}
          </div>
        </DetailCard>

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
                      width={UI_CONFIG.SPRITE_SIZE}
                      height={UI_CONFIG.SPRITE_SIZE}
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
                      width={UI_CONFIG.SPRITE_SIZE}
                      height={UI_CONFIG.SPRITE_SIZE}
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
                const statPercentage = Math.min((stat.base_stat / UI_CONFIG.MAX_STAT_VALUE) * 100, 100);
                return (
                  <div key={stat.stat.name} role="listitem">
                    <div className="flex justify-between mb-1">
                      <span className="text-black dark:text-zinc-50" id={`stat-${stat.stat.name}`}>
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
                      aria-valuemax={UI_CONFIG.MAX_STAT_VALUE}
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
              itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE_DETAIL}
              colorType="location"
            />
          ) : (
            <EmptyState title="Locations" message="No locations found" />
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
              itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE_DETAIL}
              colorType="move"
            />
          ) : (
            <EmptyState title="Moves" message="No moves found" />
          )}
        </DetailCard>
      </DetailPageLayout>
    );
  } catch {
    notFound();
  }
}
