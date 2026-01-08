// Reuse move type colors since Pokemon types are the same
import { getMoveTypeColor } from "./moveColors";

// Helper to extract color from gradient string (e.g., "from-red-500" -> "red-500")
function extractColorFromGradient(gradient: string, part: "from" | "to"): string {
  const regex = part === "from" ? /from-([^\s]+)/ : /to-([^\s]+)/;
  const match = gradient.match(regex);
  return match ? match[1] : "";
}

// Helper to get Pokemon color (uses primary type, or blends if dual-type)
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
