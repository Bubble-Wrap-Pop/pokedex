import Link from "next/link";
import Image from "next/image";
import { formatName } from "../lib/format";
import { UI_CONFIG } from "../lib/constants";
import type { ParsedEvolutionNode } from "../lib/types";

interface EvolutionChainProps {
  evolutionChain: ParsedEvolutionNode;
  currentPokemonName: string;
}

function EvolutionNode({
  node,
  currentPokemonName,
}: {
  node: ParsedEvolutionNode;
  currentPokemonName: string;
}) {
  const isCurrent = node.name === currentPokemonName;
  const hasBranches = node.evolvesTo && node.evolvesTo.length > 1;

  return (
    <div className="flex flex-col items-center">
      <Link
        href={`/pokemon/${node.name}`}
        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
          isCurrent
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105"
            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md"
        }`}
      >
        {node.sprite ? (
          <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center p-2">
            <Image
              src={node.sprite}
              alt={`${formatName(node.name)} sprite`}
              width={UI_CONFIG.SPRITE_SIZE}
              height={UI_CONFIG.SPRITE_SIZE}
              className="w-full h-full object-contain"
              priority={false}
            />
          </div>
        ) : (
          <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
            <p className="text-xs text-zinc-400">No sprite</p>
          </div>
        )}
        <h3
          className={`font-semibold text-center ${
            isCurrent
              ? "text-blue-600 dark:text-blue-400"
              : "text-black dark:text-zinc-50"
          }`}
        >
          {formatName(node.name)}
        </h3>
        {node.minLevel && (
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Lv. {node.minLevel}
          </p>
        )}
        {node.item && (
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {formatName(node.item)}
          </p>
        )}
      </Link>

      {/* Render branches if this Pokemon evolves */}
      {node.evolvesTo && node.evolvesTo.length > 0 && (
        <>
          {/* Arrow pointing down */}
          <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 md:w-8 md:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </div>

          {/* Render branches */}
          {hasBranches ? (
            // Multiple branches - display horizontally
            <div className="flex flex-wrap items-start justify-center gap-4 md:gap-6 mt-2">
              {node.evolvesTo.map((branch) => (
                <div key={branch.name} className="flex flex-col items-center">
                  <EvolutionNode
                    node={branch}
                    currentPokemonName={currentPokemonName}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Single branch - linear evolution
            <div className="flex flex-col items-center">
              {node.evolvesTo.map((branch) => (
                <EvolutionNode
                  key={branch.name}
                  node={branch}
                  currentPokemonName={currentPokemonName}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function EvolutionChain({
  evolutionChain,
  currentPokemonName,
}: EvolutionChainProps) {
  // Check if Pokemon has evolutions
  const hasEvolutions = evolutionChain.evolvesTo && evolutionChain.evolvesTo.length > 0;

  // If this is a Pokemon that doesn't evolve, show message
  if (!hasEvolutions && evolutionChain.name === currentPokemonName) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        This Pokemon does not evolve.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6">
      <EvolutionNode
        node={evolutionChain}
        currentPokemonName={currentPokemonName}
      />
    </div>
  );
}
