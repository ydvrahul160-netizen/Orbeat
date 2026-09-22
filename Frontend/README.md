# Frontend - Spotify Clone

A modern, responsive React music streaming application built with Vite and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Architecture

### Component Structure

#### Pages (`src/pages/`)
- `ProfilePage.jsx` - User profile with statistics and artist tools
- `ArtistRegisterPage.jsx` - Artist account registration
- Home page features (handled in App.jsx)
- Other pages imported from components

#### Components (`src/components/`)

**Auth Components:**
- `auth/LoginForm.jsx` - User login form
- `auth/RegisterForm.jsx` - User registration form

**Music Components:**
- `music/MusicList.jsx` - Display list of songs
- `music/MusicCard.jsx` - Individual song card

**Album Components:**
- `album/AlbumList.jsx` - List of albums
- `album/AlbumCard.jsx` - Individual album card
- `album/AlbumDetails.jsx` - Album details page

**Home Components:**
- `home/Hero.jsx` - Hero section
- `home/Features.jsx` - Features showcase
- `home/CTA.jsx` - Call to action
- `home/TopArtists.jsx` - Top artists section
- `home/TrendingSongs.jsx` - Trending songs section

**Layout Components:**
- `layout/Navbar.jsx` - Navigation bar
- `layout/Sidebar.jsx` - Sidebar navigation
- `layout/Footer.jsx` - Footer section

**UI Components:**
- `ui/Button.jsx` - Reusable button
- `ui/Input.jsx` - Reusable input field
- `ui/Loader.jsx` - Loading spinner
- `ui/EmptyState.jsx` - Empty state display

**Custom Components:**
- `ContentShelf.jsx` - Horizontal scrollable shelf (Radio, Charts, Picks)
- `UploadMusic.jsx` - Music upload form
- `CreateAlbum.jsx` - Album creation form

### Data Layer (`src/data/`)
- `shelves.js` - Static data for content shelves
  - radioStations
  - featuredCharts
  - editorPicks

### Utilities (`src/utils/`)
- `helpers.js` - Helper functions
  - `getScore()` - Calculate song popularity score
  - `filterByQuery()` - Filter items by search query

### API Layer (`src/api/`)
- `fetchClient.js` - HTTP client setup
- `auth.js` - Auth API calls
- `music.js` - Music API calls
- `api.js` - Main API file (all endpoints exported)

### State Management (`src/contexts/`)
- `AuthContext.jsx` - Authentication context

### Custom Hooks (`src/hooks/`)
- `useAuth.js` - Auth hook

### Main Application (`src/`)
- `App.jsx` - Main app component with routing
- `main.jsx` - React entry point
- `App.css` - Global styles
- `index.css` - Global styles

## Key Features

### User Features
✅ User registration and login
✅ Search music and albums
✅ Play music with built-in player
✅ Like/unlike songs
✅ Leave comments on songs
✅ View user profile
✅ Track play counts

### Artist Features
✅ Upgrade account to artist
✅ Upload music files
✅ Create albums
✅ View artist statistics
✅ Manage uploads

### UI/UX
✅ Dark theme (Spotify-like)
✅ Responsive design (mobile-first)
✅ Smooth animations
✅ Real-time search
✅ Loading states
✅ Error handling

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **Icons**: React Icons
- **HTTP Client**: Fetch API

## Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Environment Variables

Create `.env` file in frontend root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Deployment

### Build
```bash
npm run build
```

### Deployment Options
- **Vercel** - Recommended for React/Vite apps
- **Netlify** - Alternative static host
- **GitHub Pages** - Free option with limitations
- **AWS S3 + CloudFront** - Scalable solution

---
**Last Updated:** 2026-07-03
