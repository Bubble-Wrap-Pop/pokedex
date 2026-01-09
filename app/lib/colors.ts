import { API_ENDPOINTS } from "./constants";

// ============================================================================
// Type Colors (Base)
// ============================================================================

/**
 * Pokemon/Move type color mappings
 */
export const moveTypeColors: Record<string, string> = {
  normal: "from-gray-400 to-gray-500",
  fire: "from-red-500 to-red-600",
  water: "from-blue-500 to-blue-600",
  electric: "from-yellow-400 to-yellow-500",
  grass: "from-green-500 to-green-600",
  ice: "from-cyan-400 to-cyan-500",
  fighting: "from-orange-500 to-orange-600",
  poison: "from-purple-500 to-purple-600",
  ground: "from-amber-600 to-amber-700",
  flying: "from-sky-400 to-sky-500",
  psychic: "from-pink-500 to-pink-600",
  bug: "from-emerald-500 to-emerald-600",
  rock: "from-stone-600 to-stone-700",
  ghost: "from-violet-600 to-violet-700",
  dragon: "from-indigo-600 to-indigo-700",
  dark: "from-gray-800 to-gray-900",
  steel: "from-slate-500 to-slate-600",
  fairy: "from-rose-300 to-rose-400",
};

/**
 * Get color for a move/Pokemon type
 */
export function getMoveTypeColor(typeName: string): string {
  return moveTypeColors[typeName.toLowerCase()] || "from-gray-400 to-gray-500";
}

// ============================================================================
// Pokemon Colors
// ============================================================================

/**
 * Helper to extract color from gradient string (e.g., "from-red-500" -> "red-500")
 */
function extractColorFromGradient(gradient: string, part: "from" | "to"): string {
  const regex = part === "from" ? /from-([^\s]+)/ : /to-([^\s]+)/;
  const match = gradient.match(regex);
  return match ? match[1] : "";
}

/**
 * Get Pokemon color (uses primary type, or blends if dual-type)
 */
export function getPokemonColor(types: Array<{ type: { name: string } }>): string {
  if (!types || !Array.isArray(types) || types.length === 0) {
    return "from-gray-400 to-gray-500";
  }
  
  // Get first type
  const firstType = types[0];
  if (!firstType || !firstType.type || !firstType.type.name) {
    return "from-gray-400 to-gray-500";
  }
  
  const primaryType = firstType.type.name;
  const primaryColor = getMoveTypeColor(primaryType);
  
  // If single type, return its color
  if (types.length === 1) {
    return primaryColor || "from-gray-400 to-gray-500";
  }
  
  // For dual-type, blend the colors
  const secondType = types[1];
  if (!secondType || !secondType.type || !secondType.type.name) {
    return primaryColor || "from-gray-400 to-gray-500";
  }
  
  const secondaryType = secondType.type.name;
  const secondaryColor = getMoveTypeColor(secondaryType);
  
  // Extract colors from gradients and create a blend
  const fromColor = extractColorFromGradient(primaryColor, "from");
  const toColor = extractColorFromGradient(secondaryColor, "to");
  
  if (fromColor && toColor) {
    return `from-${fromColor} to-${toColor}`;
  }
  
  // Fallback if extraction fails
  return primaryColor || "from-gray-400 to-gray-500";
}

// ============================================================================
// Region & Generation Colors
// ============================================================================

/**
 * Get color for a region based on the games in each generation
 */
export function getRegionColor(regionName: string | null | undefined): string {
  if (!regionName) {
    return "from-gray-400 to-gray-500";
  }
  
  const regionColors: Record<string, string> = {
    // Gen 1 - Kanto: Yellow
    "kanto": "from-yellow-400 to-yellow-500",
    
    // Gen 2 - Johto: Crystal
    "johto": "from-cyan-300 to-cyan-400",
    
    // Gen 3 - Hoenn: Emerald
    "hoenn": "from-emerald-500 to-emerald-600",
    
    // Gen 4 - Sinnoh: Platinum
    "sinnoh": "from-slate-400 to-slate-500",
    
    // Gen 5 - Unova: Black & White gradient
    "unova": "from-gray-900 to-gray-50",
    
    // Gen 6 - Kalos: X, Y & Z gradient (Xerneas blue, Zygarde green, Yveltal red)
    "kalos": "from-blue-500 via-green-500 to-red-500",
    
    // Gen 7 - Alola: Sun & Moon gradient
    "alola": "from-yellow-500 to-indigo-600",
    
    // Gen 8 - Galar: Sword & Shield gradient
    "galar": "from-slate-500 to-blue-600",
    
    // Gen 9 - Paldea: Scarlet & Violet gradient
    "paldea": "from-red-600 to-violet-600",
  };
  
  return regionColors[regionName.toLowerCase()] || "from-gray-400 to-gray-500";
}

/**
 * Get color for a generation (uses main_region mapping)
 */
export function getGenerationColor(generationName: string): string {
  // Map generation names to their main regions
  const generationToRegion: Record<string, string> = {
    "generation-i": "kanto",
    "generation-ii": "johto",
    "generation-iii": "hoenn",
    "generation-iv": "sinnoh",
    "generation-v": "unova",
    "generation-vi": "kalos",
    "generation-vii": "alola",
    "generation-viii": "galar",
    "generation-ix": "paldea",
  };
  
  const regionName = generationToRegion[generationName.toLowerCase()];
  return getRegionColor(regionName);
}

// ============================================================================
// List Item Color Fetchers (API-based)
// ============================================================================

/**
 * Color fetching functions for different list item types.
 * These functions fetch data from the API and return the appropriate color gradient.
 */

export async function getPokemonItemColor(name: string): Promise<string> {
  try {
    const response = await fetch(`${API_ENDPOINTS.POKEMON}/${name}`);
    if (!response.ok) {
      return "from-gray-400 to-gray-500";
    }
    
    const pokemon = await response.json();
    
    // Check if types exist and have the expected structure
    if (pokemon.types && Array.isArray(pokemon.types) && pokemon.types.length > 0) {
      const firstType = pokemon.types[0];
      if (firstType && firstType.type && firstType.type.name) {
        return getPokemonColor(pokemon.types);
      }
    }
    return "from-gray-400 to-gray-500";
  } catch {
    return "from-gray-400 to-gray-500";
  }
}

export async function getMoveItemColor(name: string): Promise<string> {
  try {
    const response = await fetch(`${API_ENDPOINTS.MOVE}/${name}`);
    const move = await response.json();
    if (move.type) {
      return getMoveTypeColor(move.type.name);
    }
    return "from-gray-400 to-gray-500";
  } catch {
    return "from-gray-400 to-gray-500";
  }
}

export async function getLocationItemColor(name: string): Promise<string> {
  try {
    const response = await fetch(`${API_ENDPOINTS.LOCATION}/${name}`);
    if (!response.ok) {
      return "from-gray-400 to-gray-500";
    }
    
    const location = await response.json();
    
    // Get region from location data
    if (location.region && location.region.name) {
      return getRegionColor(location.region.name);
    }
    return "from-gray-400 to-gray-500";
  } catch {
    return "from-gray-400 to-gray-500";
  }
}

export async function getGenerationItemColor(name: string): Promise<string> {
  return getGenerationColor(name);
}

// ============================================================================
// Color Type Mapping
// ============================================================================

/**
 * Gets the appropriate color fetching function based on item type.
 * This keeps the color logic in the colors file.
 */
export function getItemColorFunction(colorType?: string) {
  switch (colorType) {
    case "pokemon":
      return getPokemonItemColor;
    case "move":
      return getMoveItemColor;
    case "location":
      return getLocationItemColor;
    case "generation":
      return getGenerationItemColor;
    default:
      return undefined;
  }
}
