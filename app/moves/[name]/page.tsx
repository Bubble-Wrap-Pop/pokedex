import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BackButton from "../../components/BackButton";
import SearchableList from "../../components/SearchableList";
import { getMove } from "../../lib/api";
import type { MoveData } from "../../lib/types";
import { formatName } from "../../lib/format";

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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <h1 className="text-4xl font-bold mb-8 capitalize text-black dark:text-zinc-50">
          {formattedName}
        </h1>

        {/* Move Stats */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
            Stats
          </h2>
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
        </div>

        {/* Flavor Text */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
            Flavor Text
          </h2>
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
            <p className="text-zinc-600 dark:text-zinc-400">
              No flavor text available
            </p>
          )}
        </div>

        {/* Pokemon that can learn this move */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
          {move.learned_by_pokemon && move.learned_by_pokemon.length > 0 ? (
            <SearchableList
              title="Pokemon that can learn this move"
              items={move.learned_by_pokemon.map((p) => ({ name: p.name }))}
              hrefPattern="/pokemon/{name}"
              titleSize="medium"
            />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
                Pokemon that can learn this move
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                No Pokemon can learn this move
              </p>
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
