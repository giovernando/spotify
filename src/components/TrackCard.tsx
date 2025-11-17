import { useState, useEffect } from "react";
import { Play, MoreHorizontal, Plus, ListMusic, EyeOff, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TrackCardProps {
  index: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover?: string;
  setCurrentTrack?: (track: { title: string; artist: string; cover: string }) => void;
}

export const TrackCard = ({ index, title, artist, album, duration, cover, setCurrentTrack }: TrackCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Load playlists from localStorage, fallback to mock data
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Playlist #1" },
    { id: 2, name: "Chill Vibes" },
    { id: 3, name: "Workout Mix" },
    { id: 4, name: "Study Session" },
  ]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem('userPlaylists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedPlaylists = localStorage.getItem('userPlaylists');
      if (savedPlaylists) {
        setPlaylists(JSON.parse(savedPlaylists));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const trackId = `${title}-${artist}`;
    setIsFavorite(favorites.some((fav: any) => fav.id === trackId));
  }, [title, artist]);

  const handleAddToPlaylist = (playlistId: number) => {
    const playlistTracks = JSON.parse(localStorage.getItem(`playlist_${playlistId}`) || '[]');
    const trackData = {
      id: `${title}-${artist}`,
      index: playlistTracks.length + 1,
      title,
      artist,
      album,
      duration,
      cover,
    };

    const isAlreadyInPlaylist = playlistTracks.some((track: any) => track.id === trackData.id);
    if (!isAlreadyInPlaylist) {
      playlistTracks.push(trackData);
      localStorage.setItem(`playlist_${playlistId}`, JSON.stringify(playlistTracks));
      console.log(`Added "${title}" to playlist ${playlistId}`);
    } else {
      console.log(`"${title}" is already in playlist ${playlistId}`);
    }
  };



  const handleAddToQueue = () => {
    console.log(`Adding "${title}" to queue`);
    // TODO: Implement add to queue logic
  };

  const handleHideSong = () => {
    console.log(`Hiding song "${title}"`);
    // TODO: Implement hide song logic
  };

  const handlePlayTrack = () => {
    if (setCurrentTrack) {
      setCurrentTrack({
        title,
        artist,
        cover: cover || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      });
    }
    console.log(`Playing track "${title}" by ${artist}`);
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const trackData = {
      id: `${title}-${artist}`,
      index: index,
      title,
      artist,
      album,
      duration,
      cover,
    };

    if (!isFavorite) {
      favorites.push(trackData);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      console.log(`Added "${title}" to favorites`);
    } else {
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== trackData.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      console.log(`Removed "${title}" from favorites`);
    }
  };

  return (
    <div
      className="grid grid-cols-[60px_1fr_1fr_80px_60px] md:grid-cols-[80px_1fr_1fr_100px_80px] gap-2 md:gap-4 items-center py-2 px-2 md:px-4 rounded hover:bg-accent group transition-colors cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Index / Play Button */}
      <div className="flex items-center justify-center">
        {isHovered ? (
          <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-transparent">
            <Play className="w-4 h-4 fill-current" />
          </Button>
        ) : (
          <span className="text-muted-foreground text-sm">{index}</span>
        )}
      </div>

      {/* Track Info */}
      <div className="flex items-center space-x-3">
        {cover && (
          <img src={cover} alt={title} className="w-10 h-10 rounded object-cover" />
        )}
        <div className="flex flex-col min-w-0">
          <div className="font-medium text-sm truncate">{title}</div>
          <Link
            to={`/artist/${encodeURIComponent(artist)}`}
            className="text-xs text-muted-foreground truncate hover:text-primary transition-colors"
          >
            {artist}
          </Link>
        </div>
      </div>

      {/* Album */}
      <div className="text-sm text-muted-foreground truncate">{album}</div>

      {/* Duration */}
      <div className="text-sm text-muted-foreground text-right min-w-[60px] md:min-w-[100px]">{duration}</div>

      {/* More Options */}
      <div className={cn("flex justify-end", !isHovered && "opacity-0")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Plus className="mr-2 h-4 w-4" />
                Tambahkan ke Playlist
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist.id}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                  >
                    <ListMusic className="mr-2 h-4 w-4" />
                    {playlist.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={handleAddToFavorites}>
              <Heart className="mr-2 h-4 w-4" />
              {isFavorite ? "Hapus dari Favorit" : "Tambahkan ke Favorit"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddToQueue}>
              <Plus className="mr-2 h-4 w-4" />
              Tambahkan ke Antrean
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleHideSong}>
              <EyeOff className="mr-2 h-4 w-4" />
              Sembunyikan Lagu
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePlayTrack}>
              <Play className="mr-2 h-4 w-4" />
              Putar Lagu
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
