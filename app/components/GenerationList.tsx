"use client";

import { useCallback } from "react";
import SearchableList from "./SearchableList";
import { getGenerationColor } from "../lib/regionColors";

type ListItem = { name: string };

interface GenerationListProps {
  title: string;
  items: ListItem[];
  hrefPattern: string;
  titleSize?: "large" | "medium";
  itemsPerPage?: number;
}

export default function GenerationList({
  title,
  items,
  hrefPattern,
  titleSize = "large",
  itemsPerPage,
}: GenerationListProps) {
  const getGenerationItemColor = useCallback(async (name: string): Promise<string> => {
    return getGenerationColor(name);
  }, []);

  return (
    <SearchableList
      title={title}
      items={items}
      hrefPattern={hrefPattern}
      titleSize={titleSize}
      formatType="generation"
      itemsPerPage={itemsPerPage}
      getItemColor={getGenerationItemColor}
    />
  );
}
