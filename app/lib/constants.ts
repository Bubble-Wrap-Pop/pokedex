export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export const API_ENDPOINTS = {
  POKEMON: `${POKEAPI_BASE_URL}/pokemon`,
  LOCATION: `${POKEAPI_BASE_URL}/location`,
  MOVE: `${POKEAPI_BASE_URL}/move`,
  GENERATION: `${POKEAPI_BASE_URL}/generation`,
} as const;
