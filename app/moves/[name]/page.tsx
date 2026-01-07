"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BackButton from "../../components/BackButton";

interface FlavorText {
  flavor_text: string;
  version_group: {
    name: string;
  };
}

interface Pokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

interface MoveData {
  name: string;
  accuracy: number | null;
  pp: number | null;
  power: number | null;
  flavor_text_entries: FlavorText[];
  learned_by_pokemon: Pokemon[];
}

export default function MoveDetailPage() {
  const params = useParams();
  const moveName = params.name as string;
  const [move, setMove] = useState<MoveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMoveData();
  }, [moveName]);

  const fetchMoveData = async () => {
    try {
      setLoading(true);
      setError(null);

      const moveResponse = await fetch(
        `https://pokeapi.co/api/v2/move/${moveName}`
      );
      if (!moveResponse.ok) {
        throw new Error("Move not found");
      }
      const moveData: MoveData = await moveResponse.json();
      setMove(moveData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load move");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !move) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
          {error || "Move not found"}
        </div>
      </div>
    );
  }

  const formattedName = move.name.replace(/-/g, " ");

  // Group flavor text by version group
  const flavorTextByVersion = move.flavor_text_entries.reduce(
    (acc, entry) => {
      const versionName = entry.version_group.name.replace(/-/g, " ");
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
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
          Pokemon that can learn this move
        </h2>
        {move.learned_by_pokemon && move.learned_by_pokemon.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {move.learned_by_pokemon
              .filter((p) => p?.pokemon?.name)
              .map((p) => (
                <Link
                  key={p.pokemon.name}
                  href={`/pokemon/${p.pokemon.name}`}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors capitalize"
                >
                  {p.pokemon.name.replace(/-/g, " ")}
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            No Pokemon can learn this move
          </p>
        )}
      </div>
    </div>
  );
}
