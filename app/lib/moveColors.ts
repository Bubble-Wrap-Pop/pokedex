// Pokemon type color mappings
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

export function getMoveTypeColor(typeName: string): string {
  return moveTypeColors[typeName.toLowerCase()] || "from-gray-400 to-gray-500";
}
