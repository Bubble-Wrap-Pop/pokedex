// Pokemon types
export interface PokemonData {
  name: string;
  species: {
    name: string;
    url: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonSpeciesData {
  name: string;
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainData {
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
  evolution_details?: Array<{
    min_level: number | null;
    trigger: {
      name: string;
    };
    item: {
      name: string;
    } | null;
  }>;
}

// Parsed evolution node structure for display
export interface ParsedEvolutionNode {
  name: string;
  sprite: string | null;
  minLevel: number | null;
  trigger: string;
  item: string | null;
  evolvesTo: ParsedEvolutionNode[];
}

// Location types
export interface LocationData {
  name: string;
  region: {
    name: string;
  } | null;
  areas: Array<{
    name: string;
    url: string;
  }>;
}

export interface LocationArea {
  name: string;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

// Move types
export interface MoveData {
  name: string;
  accuracy: number | null;
  pp: number | null;
  power: number | null;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  } | null;
  flavor_text_entries: Array<{
    flavor_text: string;
    version_group: {
      name: string;
    };
  }>;
  learned_by_pokemon: Array<{
    name: string;
    url: string;
  }>;
}

// Generation types
export interface GenerationData {
  name: string;
  main_region: {
    name: string;
  } | null;
  pokemon_species: Array<{
    name: string;
    url: string;
  }>;
}

// API Response types
export interface PokeAPIListResponse {
  count?: number;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonEncounter {
  location_area: {
    name: string;
    url: string;
  };
}

export interface LocationAreaData {
  location: {
    name: string;
  };
}

// Component types
export type SearchableListItem = { name: string };

// Next.js page props
export interface DetailPageParams {
  params: Promise<{ name: string }>;
}