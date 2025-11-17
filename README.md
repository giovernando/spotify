# Spotify Clone

A modern music streaming application built with React, TypeScript, and Supabase, featuring a sleek UI inspired by Spotify.

## Features

- **Music Player**: Full-featured audio player with play/pause, skip, and volume controls
- **Playlists**: Create and manage custom playlists
- **User Authentication**: Login and registration with Supabase
- **User Profiles**: Personalized user profiles and settings
- **Notifications**: Real-time notifications system
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Dark/Light Theme**: Theme switching with next-themes

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn-ui, Radix UI, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Real-time)
- **State Management**: React Query (TanStack)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <https://github.com/giovernando/spotify.git>
cd <spotify>
```

2. Install dependencies:
```sh
npm install
```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `src/integrations/supabase/client.ts`

4. Start the development server:
```sh
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

This project is private and proprietary.
