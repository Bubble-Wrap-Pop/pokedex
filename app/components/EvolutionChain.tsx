import Link from "next/link";
import Image from "next/image";
import { formatName } from "../lib/format";
import { UI_CONFIG } from "../lib/constants";

interface EvolutionChainProps {
  evolutions: Array<{
    name: string;
    sprite: string | null;
    minLevel: number | null;
    trigger: string;
    item: string | null;
  }>;
  currentPokemonName: string;
}

export default function EvolutionChain({
  evolutions,
  currentPokemonName,
}: EvolutionChainProps) {
  if (evolutions.length <= 1) {
    return (
      <p className="text-zinc-600 dark:text-zinc-400">
        This Pokemon does not evolve.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {evolutions.map((evo, index) => {
        const isCurrent = evo.name === currentPokemonName;
        const isLast = index === evolutions.length - 1;

        return (
          <div key={evo.name} className="flex items-center gap-4 md:gap-6">
            <Link
              href={`/pokemon/${evo.name}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                isCurrent
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md"
              }`}
            >
              {evo.sprite ? (
                <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center p-2">
                  <Image
                    src={evo.sprite}
                    alt={`${formatName(evo.name)} sprite`}
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
                {formatName(evo.name)}
              </h3>
              {evo.minLevel && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Lv. {evo.minLevel}
                </p>
              )}
              {evo.item && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {formatName(evo.item)}
                </p>
              )}
            </Link>
            {!isLast && (
              <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600">
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
