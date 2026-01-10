const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export const API_CONFIG = {
  BASE_URL: POKEAPI_BASE_URL,
  CACHE_REVALIDATE: 3600, // 1 hour in seconds
  DEFAULT_PAGE_SIZE: 1500, // For fetchAllList
} as const;

export const API_ENDPOINTS = {
  POKEMON: `${POKEAPI_BASE_URL}/pokemon`,
  POKEMON_SPECIES: `${POKEAPI_BASE_URL}/pokemon-species`,
  LOCATION: `${POKEAPI_BASE_URL}/location`,
  MOVE: `${POKEAPI_BASE_URL}/move`,
  GENERATION: `${POKEAPI_BASE_URL}/generation`,
  EVOLUTION_CHAIN: `${POKEAPI_BASE_URL}/evolution-chain`,
} as const;

export const UI_CONFIG = {
  ITEMS_PER_PAGE: 100,
  ITEMS_PER_PAGE_DETAIL: 20,
  MAX_STAT_VALUE: 255,
  SPRITE_SIZE: 160,
} as const;