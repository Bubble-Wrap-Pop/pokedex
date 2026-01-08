"use client";

import { useCallback } from "react";
import SearchableList from "./SearchableList";
import { getMoveTypeColor } from "../lib/moveColors";
import { API_ENDPOINTS } from "../lib/constants";

type ListItem = { name: string };

interface MovesListProps {
  title: string;
  items: ListItem[];
  hrefPattern: string;
  titleSize?: "large" | "medium";
  itemsPerPage?: number;
}

export default function MovesList({
  title,
  items,
  hrefPattern,
  titleSize = "large",
  itemsPerPage,
}: MovesListProps) {
  const getMoveColor = useCallback(async (name: string): Promise<string> => {
    try {
      const response = await fetch(`${API_ENDPOINTS.MOVE}/${name}`);
      const move = await response.json();
      if (move.type) {
        return getMoveTypeColor(move.type.name);
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
      getItemColor={getMoveColor}
    />
  );
}
