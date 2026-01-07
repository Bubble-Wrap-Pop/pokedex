"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BackButton from "../../components/BackButton";

interface LocationArea {
  name: string;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

interface LocationData {
  name: string;
  region: {
    name: string;
  };
  areas: Array<{
    name: string;
    url: string;
  }>;
}

export default function LocationDetailPage() {
  const params = useParams();
  const locationName = params.name as string;
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationAreas, setLocationAreas] = useState<LocationArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocationData();
  }, [locationName]);

  const fetchLocationData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch location data
      const locationResponse = await fetch(
        `https://pokeapi.co/api/v2/location/${locationName}`
      );
      if (!locationResponse.ok) {
        throw new Error("Location not found");
      }
      const locationData: LocationData = await locationResponse.json();
      setLocation(locationData);

      // Fetch all location areas with Pokemon encounters
      const areaPromises = locationData.areas.map(async (area) => {
        const areaResponse = await fetch(area.url);
        const areaData = await areaResponse.json();
        return areaData as LocationArea;
      });

      const areas = await Promise.all(areaPromises);
      setLocationAreas(areas);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load location");
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

  if (error || !location) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
          {error || "Location not found"}
        </div>
      </div>
    );
  }

  const formattedName = location.name.replace(/-/g, " ");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackButton />
      <h1 className="text-4xl font-bold mb-2 capitalize text-black dark:text-zinc-50">
        {formattedName}
      </h1>
      {location.region && (
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 capitalize">
          Region: {location.region.name.replace(/-/g, " ")}
        </p>
      )}

      <div className="space-y-6">
        {locationAreas.map((area) => {
          const areaName = area.name.replace(/-/g, " ");
          const pokemon = area.pokemon_encounters || [];

          return (
            <div
              key={area.name}
              className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800"
            >
              <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-zinc-50">
                {areaName}
              </h2>
              {pokemon.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {pokemon.map((encounter) => (
                    <Link
                      key={encounter.pokemon.name}
                      href={`/pokemon/${encounter.pokemon.name}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors capitalize"
                    >
                      {encounter.pokemon.name.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-600 dark:text-zinc-400">
                  No Pokemon found in this area
                </p>
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
}
