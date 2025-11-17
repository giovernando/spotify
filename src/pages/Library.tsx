import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlaylistCard } from "@/components/PlaylistCard";
import { TrackCard } from "@/components/TrackCard";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Heart, Clock, ListMusic, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface LibraryProps {
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
  };
  setCurrentTrack: (track: { title: string; artist: string; cover: string }) => void;
}

const Library = ({ currentTrack, setCurrentTrack }: LibraryProps) => {
  const [selectedTab, setSelectedTab] = useState("playlists");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Playlist #1", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", description: "Created by you" },
    { id: 2, name: "Chill Vibes", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", description: "Relaxing music" },
    { id: 3, name: "Workout Mix", cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", description: "High energy tracks" },
    { id: 4, name: "Study Session", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", description: "Focus music" },
  ]);

  const [favorites, setFavorites] = useState<any[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedPlaylists = localStorage.getItem('userPlaylists');
    if (savedPlaylists) {
      const parsedPlaylists = JSON.parse(savedPlaylists);
      setPlaylists(parsedPlaylists.map((p: any) => ({
        id: p.id,
        name: p.name,
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        description: "Created by you"
      })));
    }

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedRecentlyPlayed = localStorage.getItem('recentlyPlayed');
    if (savedRecentlyPlayed) {
      setRecentlyPlayed(JSON.parse(savedRecentlyPlayed));
    }
  }, []);

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      id: playlists.length + 1,
      name: `My Playlist #${playlists.length + 1}`,
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      description: "Created by you"
    };
    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    localStorage.setItem('userPlaylists', JSON.stringify(updatedPlaylists.map(p => ({ id: p.id, name: p.name }))));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-24">
          <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">Pustaka Anda</h1>

              {/* Library Tabs */}
              <div className="flex space-x-2 mb-6 overflow-x-auto">
                <button
                  onClick={() => setSelectedTab("playlists")}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedTab === "playlists"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Playlist
                </button>
                <button
                  onClick={() => setSelectedTab("favorites")}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedTab === "favorites"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Lagu yang Disukai
                </button>
                <button
                  onClick={() => setSelectedTab("recent")}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedTab === "recent"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Sering Diputar
                </button>
              </div>
            </div>

            {/* Content */}
            {selectedTab === "playlists" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Playlist Anda</h2>
                  <Button onClick={handleCreatePlaylist} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Playlist
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {playlists.map((playlist) => (
                    <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                      <PlaylistCard
                        id={playlist.id.toString()}
                        title={playlist.name}
                        description={playlist.description}
                        cover={playlist.cover}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === "favorites" && (
              <div>
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 mr-3 text-red-500" />
                  <h2 className="text-2xl font-bold">Lagu yang Disukai</h2>
                </div>
                {favorites.length > 0 ? (
                  <div className="space-y-1">
                    {favorites.map((track) => (
                      <TrackCard
                        key={track.index}
                        index={track.index}
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
                    <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Belum ada lagu yang disukai</h3>
                    <p className="text-muted-foreground">Tekan tombol hati pada lagu untuk menambahkannya ke daftar favorit</p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === "recent" && (
              <div>
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 mr-3 text-blue-500" />
                  <h2 className="text-2xl font-bold">Sering Diputar</h2>
                </div>
                {recentlyPlayed.length > 0 ? (
                  <div className="space-y-1">
                    {recentlyPlayed.map((track) => (
                      <TrackCard
                        key={track.index}
                        index={track.index}
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
                    <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Belum ada lagu yang sering diputar</h3>
                    <p className="text-muted-foreground">Lagu yang sering Anda putar akan muncul di sini</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <MusicPlayer currentTrack={currentTrack} />
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default Library;
