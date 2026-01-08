"use client";

import { useCallback } from "react";
import SearchableList from "./SearchableList";
import { getPokemonColor } from "../lib/pokemonColors";
import { API_ENDPOINTS } from "../lib/constants";

type ListItem = { name: string };

interface PokemonListProps {
  title: string;
  items: ListItem[];
  hrefPattern: string;
  titleSize?: "large" | "medium";
  itemsPerPage?: number;
}

export default function PokemonList({
  title,
  items,
  hrefPattern,
  titleSize = "large",
  itemsPerPage,
}: PokemonListProps) {
  const getPokemonItemColor = useCallback(async (name: string): Promise<string> => {
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
  }, []);

  return (
    <SearchableList
      title={title}
      items={items}
      hrefPattern={hrefPattern}
      titleSize={titleSize}
      itemsPerPage={itemsPerPage}
      getItemColor={getPokemonItemColor}
    />
  );
}
