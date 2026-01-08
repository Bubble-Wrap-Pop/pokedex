import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import EmptyStateCard from "../../components/EmptyStateCard";
import PokemonList from "../../components/PokemonList";
import { getMove } from "../../lib/api";
import { formatName } from "../../lib/format";
import { UI_CONFIG } from "../../lib/constants";
import { generateDetailMetadata } from "../../lib/metadata";
import { getMoveTypeColor } from "../../lib/moveColors";

interface MoveDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: MoveDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatName(name);
  return generateDetailMetadata("move", `${formattedName} stats, flavor text, and Pokémon that can learn it.`, name);
}

export default async function MoveDetailPage({ params }: MoveDetailPageProps) {
  const { name: moveName } = await params;

  try {
    const move = await getMove(moveName);
    const formattedName = formatName(move.name);

    const flavorTextByVersion = move.flavor_text_entries.reduce(
      (acc, entry) => {
        const versionName = formatName(entry.version_group.name);
        if (!acc[versionName]) {
          acc[versionName] = entry.flavor_text;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const moveTypeColor = getMoveTypeColor(move.type.name);
    const damageClassName = move.damage_class ? formatName(move.damage_class.name) : "N/A";
    const damageClassImage = move.damage_class 
      ? move.damage_class.name === "physical" || move.damage_class.name === "special" || move.damage_class.name === "status"
        ? `/${move.damage_class.name}.png`
        : null
      : null;

    return (
      <>
        {/* Colored header accent */}
        <div className={`h-2 bg-gradient-to-r ${moveTypeColor} w-full`} />
        <DetailPageLayout title={formattedName}>
        {/* Move Type and Damage Class */}
        <DetailCard title="Type & Category" className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Type</p>
              <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-br ${moveTypeColor} text-white font-semibold shadow-md`}>
                {formatName(move.type.name)}
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Damage Class</p>
              {damageClassImage ? (
                <div className="flex items-center gap-2">
                  <Image
                    src={damageClassImage}
                    alt={damageClassName}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <span className="text-xl font-semibold text-black dark:text-zinc-50">
                    {damageClassName}
                  </span>
                </div>
              ) : (
                <p className="text-xl font-semibold text-black dark:text-zinc-50">
                  {damageClassName}
                </p>
              )}
            </div>
          </div>
        </DetailCard>

        {/* Move Stats */}
        <DetailCard title="Stats" className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Accuracy</p>
              <p className="text-xl font-semibold text-black dark:text-zinc-50">
                {move.accuracy !== null ? move.accuracy : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Power Points (PP)
              </p>
              <p className="text-xl font-semibold text-black dark:text-zinc-50">
                {move.pp !== null ? move.pp : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Power</p>
              <p className="text-xl font-semibold text-black dark:text-zinc-50">
                {move.power !== null ? move.power : "N/A"}
              </p>
            </div>
          </div>
        </DetailCard>

        {/* Flavor Text */}
        <DetailCard title="Flavor Text" className="mb-8">
          <div className="space-y-4">
            {Object.entries(flavorTextByVersion).map(([version, text]) => (
              <div key={version}>
                <p className="font-semibold text-black dark:text-zinc-50 mb-1">
                  {version}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
          {Object.keys(flavorTextByVersion).length === 0 && (
            <EmptyState message="No flavor text available" />
          )}
        </DetailCard>

        {/* Pokemon that can learn this move */}
        <DetailCard>
          {move.learned_by_pokemon && move.learned_by_pokemon.length > 0 ? (
            <PokemonList
              title="Pokemon that can learn this move"
              items={move.learned_by_pokemon.map((p) => ({ name: p.name }))}
              hrefPattern="/pokemon/{name}"
              titleSize="medium"
              itemsPerPage={UI_CONFIG.ITEMS_PER_PAGE_DETAIL}
            />
          ) : (
            <EmptyStateCard
              title="Pokemon that can learn this move"
              message="No Pokemon can learn this move"
            />
          )}
        </DetailCard>
      </DetailPageLayout>
      </>
    );
  } catch {
    notFound();
  }
}
