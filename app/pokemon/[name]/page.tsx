"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BackButton from "../../components/BackButton";

interface PokemonData {
  name: string;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
}

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonName = params.name as string;
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPokemonData();
  }, [pokemonName]);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch Pokemon data
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!pokemonResponse.ok) {
        throw new Error("Pokemon not found");
      }
      const pokemonData: PokemonData = await pokemonResponse.json();
      setPokemon(pokemonData);

      // Fetch location areas from Pokemon encounters endpoint
      const encountersResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`
      );
      if (encountersResponse.ok) {
        const encountersData = await encountersResponse.json();
        
        // Extract unique location names (not sub-areas)
        const locationNames = new Set<string>();
        for (const encounter of encountersData) {
          const locationAreaUrl = encounter.location_area.url;
          const locationAreaResponse = await fetch(locationAreaUrl);
          const locationAreaData = await locationAreaResponse.json();
          const locationName = locationAreaData.location.name;
          locationNames.add(locationName);
        }
        setLocations(Array.from(locationNames));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Pokemon");
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

  if (error || !pokemon) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
          {error || "Pokemon not found"}
        </div>
      </div>
    );
  }

  const formattedName = pokemon.name.replace(/-/g, " ");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackButton />
      <h1 className="text-4xl font-bold mb-8 capitalize text-black dark:text-zinc-50">
        {formattedName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Sprites */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
            Sprites
          </h2>
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                Normal
              </p>
              {pokemon.sprites.front_default && (
                <img
                  src={pokemon.sprites.front_default}
                  alt={`${formattedName} normal`}
                  className="w-32 h-32 object-contain"
                />
              )}
            </div>
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                Shiny
              </p>
              {pokemon.sprites.front_shiny && (
                <img
                  src={pokemon.sprites.front_shiny}
                  alt={`${formattedName} shiny`}
                  className="w-32 h-32 object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
            Stats
          </h2>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize text-black dark:text-zinc-50">
                    {stat.stat.name.replace(/-/g, " ")}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
          Locations
        </h2>
        {locations.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Link
                key={location}
                href={`/locations/${location}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors capitalize"
              >
                {location.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            No locations found
          </p>
        )}
      </div>

      {/* Moves */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
          Moves
        </h2>
        {pokemon.moves.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {pokemon.moves.map((move) => (
              <Link
                key={move.move.name}
                href={`/moves/${move.move.name}`}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors capitalize"
              >
                {move.move.name.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">No moves found</p>
        )}
      </div>
    </div>
  );
}
