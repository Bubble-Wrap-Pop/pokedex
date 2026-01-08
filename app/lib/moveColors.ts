// Pokemon type color mappings
export const moveTypeColors: Record<string, string> = {
  normal: "from-gray-400 to-gray-500",
  fire: "from-red-500 to-orange-500",
  water: "from-blue-500 to-cyan-500",
  electric: "from-yellow-400 to-yellow-500",
  grass: "from-green-500 to-emerald-500",
  ice: "from-cyan-300 to-blue-400",
  fighting: "from-red-700 to-orange-700",
  poison: "from-purple-500 to-pink-500",
  ground: "from-amber-600 to-yellow-600",
  flying: "from-indigo-400 to-purple-400",
  psychic: "from-pink-500 to-rose-500",
  bug: "from-lime-500 to-green-500",
  rock: "from-amber-700 to-yellow-700",
  ghost: "from-purple-600 to-indigo-600",
  dragon: "from-indigo-600 to-purple-600",
  dark: "from-gray-700 to-gray-800",
  steel: "from-gray-500 to-slate-500",
  fairy: "from-pink-300 to-rose-300",
};

export function getMoveTypeColor(typeName: string): string {
  return moveTypeColors[typeName.toLowerCase()] || "from-gray-400 to-gray-500";
}
