import type { Metadata } from "next";
import { formatName } from "./format";

export function generateDetailMetadata(
  type: "pokemon" | "location" | "move" | "generation",
  description: string,
  name?: string
): Metadata {
  // If no name provided, it's a list page - use type name
  if (!name) {
    const typeName = formatName(type);

    return {
      title: `Pokedex – ${typeName}`,
      description,
    };
  }

  // Detail page - format the name (formatName handles generation names automatically)
  const formattedName = formatName(name);

  return {
    title: `Pokedex – ${formattedName}`,
    description,
  };
}