# Ultimate Pokedex

A comprehensive Pokemon Pokedex application built with Next.js, TypeScript, and Tailwind CSS. This application consumes the [PokeAPI](https://pokeapi.co/docs/v2) to provide detailed information about Pokemon, locations, moves, and generations.

## 🚀 Live Demo

**Deployed Application:** [Add your Vercel deployment URL here]

## ✨ Features

- **Pokemon Browser**: Searchable list of all Pokemon with detailed information including:
  - Stats with visual progress bars
  - Normal and shiny sprites
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

- **Search Functionality**: Client-side search across all major lists
- **Responsive Design**: Fully optimized for mobile and desktop screens
- **Dark Mode**: Automatic dark mode support
- **Loading States**: Smooth loading skeletons for better UX
- **Navigation**: Intuitive tab-based navigation with back button support

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
   git clone <your-repo-url>
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

## 📁 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── BackButton.tsx
│   ├── DetailCard.tsx
│   ├── DetailPageLayout.tsx
│   ├── EmptyState.tsx
│   ├── EmptyStateCard.tsx
│   ├── LoadingSkeleton.tsx
│   ├── SearchableList.tsx
│   └── TabsNavigation.tsx
├── lib/                # Utility functions and API logic
│   ├── api.ts          # PokeAPI integration
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
└── layout.tsx          # Root layout with navigation
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
- Client-side search with deferred value updates for smooth performance
- Real-time filtering with pagination support
- Search works across all major list pages

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
