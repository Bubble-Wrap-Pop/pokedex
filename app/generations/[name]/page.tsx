import { notFound } from "next/navigation";
import BackButton from "../../components/BackButton";
import SearchableList from "../../components/SearchableList";
import { getGeneration } from "../../lib/api";
import type { GenerationData } from "../../lib/types";
import { formatGenerationName, formatName } from "../../lib/format";
import type { Metadata } from "next";

interface GenerationDetailPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: GenerationDetailPageProps): Promise<Metadata> {
  const { name } = await params;
  const formattedName = formatGenerationName(name);
  return {
    title: `Pokedex – ${formattedName}`,
    description: `${formattedName} details and Pokémon species.`,
  };
}

export default async function GenerationDetailPage({ params }: GenerationDetailPageProps) {
  const { name: generationName } = await params;

  try {
    const generation = await getGeneration(generationName);
    const formattedName = formatGenerationName(generation.name);

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <h1 className="text-4xl font-bold mb-2 text-black dark:text-zinc-50">
          {formattedName}
        </h1>
        {generation.main_region && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 capitalize">
            Main Region: {formatName(generation.main_region.name)}
          </p>
        )}

        {/* Pokemon Species */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
          {generation.pokemon_species && generation.pokemon_species.length > 0 ? (
            <SearchableList
              title="Pokemon Species"
              items={generation.pokemon_species.map((species) => ({
                name: species.name,
              }))}
              hrefPattern="/pokemon/{name}"
              titleSize="medium"
            />
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 capitalize text-black dark:text-zinc-50">
                Pokemon Species
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                No Pokemon species found
              </p>
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
