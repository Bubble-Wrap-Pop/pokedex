// Region colors based on the games in each generation
// Each generation has a main region, so these colors represent both regions and generations

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

// Helper to get generation color (uses main_region)
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
