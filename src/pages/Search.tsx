import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlaylistCard } from "@/components/PlaylistCard";
import { TrackCard } from "@/components/TrackCard";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
  };
  setCurrentTrack: (track: { title: string; artist: string; cover: string }) => void;
}

const Search = ({ currentTrack, setCurrentTrack }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock search results
  const searchResults = {
    tracks: [
      {
        index: 1,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: "5:55",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=50&h=50&fit=crop",
      },
      {
        index: 2,
        title: "Hey Jude",
        artist: "The Beatles",
        album: "Hey Jude",
        duration: "7:09",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=50&h=50&fit=crop",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Daily Mix 1",
        description: "The Beatles, Queen, Led Zeppelin and more",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      },
      {
        id: "2",
        title: "Discover Weekly",
        description: "Your weekly mixtape of fresh music",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Queen",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      },
      {
        id: "2",
        name: "The Beatles",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      },
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-24">
          <div className="p-4 md:p-6">
            {/* Search Header */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto md:mx-0">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cari lagu, artis, atau album..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0 focus:bg-background"
                />
              </div>
            </div>

            {searchQuery ? (
              <>
                {/* Search Results Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setSelectedTab("all")}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedTab === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setSelectedTab("tracks")}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedTab === "tracks"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Lagu
                  </button>
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
                    onClick={() => setSelectedTab("artists")}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedTab === "artists"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Artis
                  </button>
                </div>

                {/* Search Results */}
                {(selectedTab === "all" || selectedTab === "tracks") && searchResults.tracks.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Lagu</h2>
                    <div className="space-y-1">
                      {searchResults.tracks.map((track) => (
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
                  </section>
                )}

                {(selectedTab === "all" || selectedTab === "playlists") && searchResults.playlists.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Playlist</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {searchResults.playlists.map((playlist) => (
                        <PlaylistCard key={playlist.id} {...playlist} setCurrentTrack={setCurrentTrack} />
                      ))}
                    </div>
                  </section>
                )}

                {(selectedTab === "all" || selectedTab === "artists") && searchResults.artists.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Artis</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {searchResults.artists.map((artist) => (
                        <div key={artist.id} className="text-center">
                          <img
                            src={artist.cover}
                            alt={artist.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-4"
                          />
                          <h3 className="font-bold text-lg">{artist.name}</h3>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              /* Browse Categories */
              <div>
                <h1 className="text-3xl font-bold mb-6">Jelajahi Semua</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { name: "Pop", color: "bg-pink-500" },
                    { name: "Hip-Hop", color: "bg-purple-500" },
                    { name: "Rock", color: "bg-red-500" },
                    { name: "Jazz", color: "bg-blue-500" },
                    { name: "Electronic", color: "bg-green-500" },
                    { name: "Classical", color: "bg-yellow-500" },
                    { name: "Country", color: "bg-orange-500" },
                    { name: "R&B", color: "bg-indigo-500" },
                  ].map((genre) => (
                    <div
                      key={genre.name}
                      className={`${genre.color} aspect-square rounded-lg p-4 flex items-end cursor-pointer hover:scale-105 transition-transform`}
                    >
                      <h3 className="text-white font-bold text-xl">{genre.name}</h3>
                    </div>
                  ))}
                </div>
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

export default Search;
