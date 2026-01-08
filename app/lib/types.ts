// Pokemon types
export interface PokemonData {
  name: string;
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

export interface PokemonListItem {
  name: string;
  url: string;
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
