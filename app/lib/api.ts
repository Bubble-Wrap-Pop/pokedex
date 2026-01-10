import { API_ENDPOINTS, API_CONFIG } from "./constants";
import type {
  PokemonData,
  PokemonSpeciesData,
  EvolutionChainData,
  EvolutionChainLink,
  LocationData,
  LocationArea,
  MoveData,
  GenerationData,
  PokeAPIListResponse,
  PokemonEncounter,
  LocationAreaData,
} from "./types";

// Generic list item type for API responses
export type ListItem = {
  name: string;
  url: string;
};

// Generic fetch with error handling
async function fetchAPI<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      next: { revalidate: API_CONFIG.CACHE_REVALIDATE },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while fetching data");
  }
}

// Helper to fetch all list pages
async function fetchAllList(
  endpoint: string,
  pageSize: number = API_CONFIG.DEFAULT_PAGE_SIZE
): Promise<ListItem[]> {
  let offset = 0;
  let total = Number.MAX_SAFE_INTEGER;
  const results: ListItem[] = [];

  while (results.length < total) {
    const data: PokeAPIListResponse = await fetchAPI(
      `${endpoint}?limit=${pageSize}&offset=${offset}`
    );

    if (typeof data.count === "number") {
      total = data.count;
    } else if (data.results.length < pageSize) {
      // If count is missing, infer total from final short page
      total = results.length + data.results.length;
    }

    results.push(...data.results);

    if (data.results.length === 0) {
      break;
    }

    offset += pageSize;
  }

  return results;
}

// Pokemon API functions
export async function getPokemonList(limit?: number): Promise<ListItem[]> {
  if (limit) {
    const data: PokeAPIListResponse = await fetchAPI(
      `${API_ENDPOINTS.POKEMON}?limit=${limit}`
    );
    return data.results;
  }
  return fetchAllList(API_ENDPOINTS.POKEMON);
}

export async function getPokemon(name: string): Promise<PokemonData> {
  return fetchAPI<PokemonData>(`${API_ENDPOINTS.POKEMON}/${name}`);
}

export async function getPokemonLocations(name: string): Promise<string[]> {
  const encounters: PokemonEncounter[] = await fetchAPI(
    `${API_ENDPOINTS.POKEMON}/${name}/encounters`
  );

  // Fetch all location areas in parallel
  const locationAreaPromises = encounters.map((encounter) =>
    fetchAPI<LocationAreaData>(encounter.location_area.url)
  );

  const locationAreas = await Promise.all(locationAreaPromises);

  // Extract unique location names
  const locationNames = new Set<string>();
  locationAreas.forEach((area) => {
    locationNames.add(area.location.name);
  });

  return Array.from(locationNames);
}

export async function getPokemonSpecies(name: string): Promise<PokemonSpeciesData> {
  return fetchAPI<PokemonSpeciesData>(`${API_ENDPOINTS.POKEMON_SPECIES}/${name}`);
}

export async function getEvolutionChain(chainUrl: string): Promise<EvolutionChainData> {
  return fetchAPI<EvolutionChainData>(chainUrl);
}

// Helper function to flatten evolution chain into a linear array
// Note: This handles linear chains. For branching chains (like Eevee), 
// it will take the first branch. This can be enhanced later if needed.
export function parseEvolutionChain(chain: EvolutionChainLink): Array<{
  name: string;
  minLevel: number | null;
  trigger: string;
  item: string | null;
}> {
  const evolutions: Array<{
    name: string;
    minLevel: number | null;
    trigger: string;
    item: string | null;
  }> = [];

  function traverse(node: EvolutionChainLink) {
    evolutions.push({
      name: node.species.name,
      minLevel: node.evolution_details?.[0]?.min_level ?? null,
      trigger: node.evolution_details?.[0]?.trigger?.name ?? "level-up",
      item: node.evolution_details?.[0]?.item?.name ?? null,
    });

    // For now, only handle linear chains (take first evolution)
    // Branching evolution chains would require a more complex UI
    if (node.evolves_to && node.evolves_to.length > 0) {
      traverse(node.evolves_to[0]);
    }
  }

  traverse(chain);
  return evolutions;
}

// Location API functions
export async function getLocationList(limit?: number): Promise<ListItem[]> {
  if (limit) {
    const data: PokeAPIListResponse = await fetchAPI(
      `${API_ENDPOINTS.LOCATION}?limit=${limit}`
    );
    return data.results;
  }
  return fetchAllList(API_ENDPOINTS.LOCATION);
}

export async function getLocation(name: string): Promise<LocationData> {
  return fetchAPI<LocationData>(`${API_ENDPOINTS.LOCATION}/${name}`);
}

export async function getLocationAreas(areaUrls: string[]): Promise<LocationArea[]> {
  // Fetch all location areas in parallel
  const promises = areaUrls.map((url) => fetchAPI<LocationArea>(url));
  return Promise.all(promises);
}

// Move API functions
export async function getMoveList(limit?: number): Promise<ListItem[]> {
  if (limit) {
    const data: PokeAPIListResponse = await fetchAPI(
      `${API_ENDPOINTS.MOVE}?limit=${limit}`
    );
    return data.results;
  }
  return fetchAllList(API_ENDPOINTS.MOVE);
}

export async function getMove(name: string): Promise<MoveData> {
  return fetchAPI<MoveData>(`${API_ENDPOINTS.MOVE}/${name}`);
}

// Generation API functions
export async function getGenerationList(): Promise<ListItem[]> {
  const data: PokeAPIListResponse = await fetchAPI(API_ENDPOINTS.GENERATION);
  return data.results;
}

export async function getGeneration(name: string): Promise<GenerationData> {
  return fetchAPI<GenerationData>(`${API_ENDPOINTS.GENERATION}/${name}`);
}
