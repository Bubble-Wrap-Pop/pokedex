import { API_ENDPOINTS } from "./constants";
import type {
  PokemonData,
  PokemonListItem,
  LocationData,
  LocationArea,
  MoveData,
  GenerationData,
  PokeAPIListResponse,
  PokemonEncounter,
  LocationAreaData,
} from "./types";

// Generic fetch with error handling
async function fetchAPI<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
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
async function fetchAllList(endpoint: string, pageSize: number = 1000): Promise<PokemonListItem[]> {
  let offset = 0;
  let total = Number.MAX_SAFE_INTEGER;
  const results: PokemonListItem[] = [];

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
export async function getPokemonList(limit?: number): Promise<PokemonListItem[]> {
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

// Location API functions
export async function getLocationList(limit?: number): Promise<Array<{ name: string; url: string }>> {
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
export async function getMoveList(limit?: number): Promise<Array<{ name: string; url: string }>> {
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
export async function getGenerationList(): Promise<Array<{ name: string; url: string }>> {
  const data: PokeAPIListResponse = await fetchAPI(API_ENDPOINTS.GENERATION);
  return data.results;
}

export async function getGeneration(name: string): Promise<GenerationData> {
  return fetchAPI<GenerationData>(`${API_ENDPOINTS.GENERATION}/${name}`);
}
