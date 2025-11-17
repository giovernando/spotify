import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { TrackCard } from "@/components/TrackCard";
import { Heart } from "lucide-react";

interface FavoriteTrack {
  id: string;
  index: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover?: string;
}

interface FavoritesProps {
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
  };
  setCurrentTrack: (track: { title: string; artist: string; cover: string }) => void;
}

const Favorites = ({ currentTrack, setCurrentTrack }: FavoritesProps) => {
  const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const removeFromFavorites = (trackId: string) => {
    const updatedFavorites = favorites.filter(track => track.id !== trackId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-500 rounded-full">
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>
                <h1 className="text-3xl font-bold">Lagu Favorit</h1>
              </div>
              <p className="text-muted-foreground">
                {favorites.length} lagu favorit
              </p>
            </div>

            {/* Favorites List */}
            {favorites.length > 0 ? (
              <div className="space-y-1">
                {favorites.map((track, index) => (
                  <TrackCard
                    key={track.id}
                    index={index + 1}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    duration={track.duration}
                    cover={track.cover}
                    setCurrentTrack={setCurrentTrack}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Belum ada lagu favorit</h2>
                <p className="text-muted-foreground">
                  Tambahkan lagu ke favorit dengan mengklik ikon hati pada lagu yang Anda suka
                </p>
              </div>
            )}
          </div>
        </main>
        <MusicPlayer currentTrack={currentTrack} />
      </div>
    </div>
  );
};

export default Favorites;
