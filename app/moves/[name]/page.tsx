import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DetailPageLayout from "../../components/DetailPageLayout";
import DetailCard from "../../components/DetailCard";
import EmptyState from "../../components/EmptyState";
import SearchableList from "../../components/SearchableList";
import { getMove } from "../../lib/api";
import type { MoveData } from "../../lib/types";
import { formatName } from "../../lib/format";
import { ITEMS_PER_PAGE_DETAIL } from "../../lib/constants";

interface MoveDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: MoveDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatName(name);
  return {
    title: `Pokedex – ${formattedName}`,
    description: `${formattedName} stats, flavor text, and Pokémon that can learn it.`,
  };
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

    return (
      <DetailPageLayout title={formattedName}>
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
                <p className="font-semibold capitalize text-black dark:text-zinc-50 mb-1">
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
            <SearchableList
              title="Pokemon that can learn this move"
              items={move.learned_by_pokemon.map((p) => ({ name: p.name }))}
              hrefPattern="/pokemon/{name}"
              titleSize="medium"
              itemsPerPage={ITEMS_PER_PAGE_DETAIL}
            />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
                Pokemon that can learn this move
              </h2>
              <EmptyState message="No Pokemon can learn this move" />
            </>
          )}
        </DetailCard>
      </DetailPageLayout>
    );
  } catch (error) {
    notFound();
  }
}
