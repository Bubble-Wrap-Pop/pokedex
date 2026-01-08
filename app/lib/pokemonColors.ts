// Reuse move type colors since Pokemon types are the same
import { getMoveTypeColor } from "./moveColors";

// Helper to get Pokemon color (uses primary type, or blends if dual-type)
export function getPokemonColor(types: Array<{ type: { name: string } }>): string {
  if (!types || !Array.isArray(types) || types.length === 0) {
    return "from-gray-400 to-gray-500";
  }
  
  // Use primary type color
  const firstType = types[0];
  if (!firstType || !firstType.type || !firstType.type.name) {
    return "from-gray-400 to-gray-500";
  }
  
  const primaryType = firstType.type.name;
  const color = getMoveTypeColor(primaryType);
  
  // Fallback if color lookup fails
  return color || "from-gray-400 to-gray-500";
}
