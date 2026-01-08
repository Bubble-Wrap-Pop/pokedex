"use client";

import SearchableList from "../components/SearchableList";
import { formatGenerationName } from "../lib/format";

interface GenerationListClientProps {
  generations: Array<{ name: string; url: string }>;
}

export default function GenerationListClient({ generations }: GenerationListClientProps) {
  return (
    <SearchableList
      title="Generations"
      items={generations}
      hrefPattern="/generations/{name}"
      formatName={formatGenerationName}
    />
  );
}
