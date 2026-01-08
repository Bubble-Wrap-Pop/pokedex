import Image from "next/image";

export default function HeaderImage() {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="w-full h-48 relative">
        <Image
          src="/pokescape.jpg"
          alt="Pokemon Pokedex"
          fill
          className="object-cover object-bottom"
          priority
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-start pl-4 md:pl-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg shadow-black px-6 py-3 bg-black/50 dark:bg-black/70 rounded-lg backdrop-blur-sm flex items-center gap-3">
            <Image
              src="/pokeball.svg"
              alt="Pokeball"
              width={48}
              height={48}
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              priority
            />
            Pokedex
          </h1>
        </div>
      </div>
    </header>
  );
}
