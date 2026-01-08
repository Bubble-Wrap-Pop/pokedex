import type { Metadata } from "next";
import { formatName, formatGenerationName } from "./format";

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

  // Detail page - format the name
  const formattedName =
    type === "generation" ? formatGenerationName(name) : formatName(name);

  return {
    title: `Pokedex – ${formattedName}`,
    description,
  };
}