# Ultimate Pokedex

A comprehensive Pokemon Pokedex application built with Next.js, TypeScript, and Tailwind CSS. This application consumes the [PokeAPI](https://pokeapi.co/docs/v2) to provide detailed information about Pokemon, locations, moves, and generations.

## 🚀 Live Demo

**Deployed Application:** https://pokedex-beta-five-20.vercel.app

## ✨ Features

- **Pokemon Browser**: Searchable list of all Pokemon with detailed information including:
  - Stats with visual progress bars
  - Normal and shiny sprites
  - Evolution chains (supports branching evolutions like Eevee)
  - Encounter locations
  - Moves learned
  
- **Locations**: Browse game locations with:
  - Region information
  - Sub-areas with Pokemon encounters
  
- **Moves**: Explore Pokemon moves with:
  - Accuracy, Power Points (PP), and Power stats
  - Flavor text for each game version
  - List of Pokemon that can learn each move
  
- **Generations**: View Pokemon generations with:
  - Main region information
  - Complete list of Pokemon species in each generation

- **Color-Coded Lists**: Dynamic color gradients based on Pokemon types, move types, regions, and generations with intelligent batching and caching
- **Search Functionality**: Client-side search across all major lists with pagination, result counts, and deferred value updates for smooth performance
- **Responsive Design**: Fully optimized for mobile and desktop screens
- **Dark Mode**: Automatic dark mode support with smooth transitions
- **Loading States**: Smooth loading skeletons for better UX
- **Navigation**: Intuitive tab-based navigation with back button support and scroll restoration

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org) 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **React**: 19.2.3
- **API**: [PokeAPI](https://pokeapi.co/docs/v2)

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## 🏃 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bubble-Wrap-Pop/pokedex.git
   cd pokedex
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   (Note: The home page (`/`) automatically redirects to `/pokemon`)

## 📁 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── BackButton.tsx
│   ├── ColoredListItem.tsx
│   ├── DetailCard.tsx
│   ├── DetailPageLayout.tsx
│   ├── EmptyState.tsx
│   ├── EvolutionChain.tsx
│   ├── HeaderImage.tsx
│   ├── LoadingSkeleton.tsx
│   ├── SearchableList.tsx
│   └── TabsNavigation.tsx
├── lib/                # Utility functions and API logic
│   ├── api.ts          # PokeAPI integration
│   ├── colors.ts       # Color utilities for types and regions
│   ├── colors.client.ts # Client-side color hooks
│   ├── constants.ts    # Configuration constants
│   ├── format.ts       # Text formatting utilities
│   ├── metadata.ts     # SEO metadata generation
│   └── types.ts        # TypeScript type definitions
├── pokemon/            # Pokemon pages
│   ├── page.tsx        # Pokemon list
│   └── [name]/         # Individual Pokemon details
├── locations/          # Location pages
│   ├── page.tsx        # Location list
│   └── [name]/         # Individual location details
├── moves/              # Move pages
│   ├── page.tsx        # Move list
│   └── [name]/         # Individual move details
├── generations/        # Generation pages
│   ├── page.tsx        # Generation list
│   └── [name]/         # Individual generation details
├── layout.tsx          # Root layout with navigation
└── template.tsx        # Template wrapper for scroll restoration
```

## 🎯 Key Features Implementation

### Server-Side Rendering
- All pages are server-rendered by default for optimal performance
- Client components are only used where interactivity is required (search, navigation)

### API Integration
- Efficient data fetching with Next.js caching (1 hour revalidation)
- Parallel data fetching using `Promise.all` for better performance
- Graceful error handling with `notFound()` for missing resources

### Search Functionality
- Client-side search with `useDeferredValue` for smooth performance
- Real-time filtering with pagination support ("Show more" button)
- Search result count display (e.g., "50 of 1000")
- Sticky search bar on main list pages for better UX
- Search works across all major list pages
- Supports both colored and non-colored list items

### Color System
- Dynamic color gradients for list items based on Pokemon types, move types, regions, and generations
- Dual-type Pokemon use blended colors for visual appeal
- Server-side color determination for detail pages using already-fetched data
- Client-side color fetching for list items with intelligent batching:
  - Colors are only fetched for currently visible/paginated items (not all items at once)
  - Batch fetching using `useBatchItemColors` hook with parallel API calls
  - Built-in caching to avoid re-fetching colors for previously loaded items
  - Loading states with opacity transitions while colors are being fetched
  - Automatic cancellation to prevent race conditions when items change

### Scroll Restoration
- Automatic scroll-to-top on route changes using Next.js Template component
- Improved navigation experience when navigating between pages

### Evolution Chain Display
- Visual evolution chain display with Pokemon sprites
- Supports both linear and branching evolution chains (e.g., Eevee's multiple evolutions)
- Shows evolution requirements (level, item) when available
- Highlights the current Pokemon in the chain
- Clickable links to navigate between evolution stages
- Server-side rendered for optimal performance

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive grid layouts (1 column on mobile, up to 4 on desktop)
- Touch-friendly navigation and interactions

## 🚢 Deployment

This application is deployed on [Vercel](https://vercel.com). The deployment process is automatic when pushing to the main branch.

To deploy manually:
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

## 📝 Assignment Requirements

This project fulfills all requirements for the Ultimate Pokedex assignment:

✅ All required pages implemented (`/`, `/pokemon`, `/locations`, `/moves`, `/generations`, and detail pages)  
✅ Searchable lists with client-side filtering  
✅ Back button on all detail pages  
✅ Mobile responsive design  
✅ Server-side rendering with Next.js App Router  
✅ TypeScript implementation  
✅ Clean code architecture with reusable components  
✅ Polished styling with Tailwind CSS  

## 📄 License

This project was created for educational purposes.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the comprehensive Pokemon data
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment platform
