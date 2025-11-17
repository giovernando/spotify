import { useState, useEffect } from "react";
import { Play, MoreHorizontal, Heart, Plus, ListMusic, User, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TrackCardProps {
  index: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover?: string;
}

export const TrackCard = ({ index, title, artist, album, duration, cover }: TrackCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load playlists from localStorage, fallback to mock data
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Playlist #1" },
    { id: 2, name: "Chill Vibes" },
    { id: 3, name: "Workout Mix" },
    { id: 4, name: "Study Session" },
  ]);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem('userPlaylists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }

    // Check if this track is in favorites
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      const trackId = `${title}-${artist}`; // Simple ID generation
      setIsFavorite(favorites.some((fav: any) => fav.id === trackId));
    }
  }, [title, artist]);

  const handleAddToPlaylist = (playlistId: number) => {
    console.log(`Adding "${title}" to playlist ${playlistId}`);
    // TODO: Implement add to playlist logic
  };

  const handleAddToFavorites = () => {
    const trackId = `${title}-${artist}`;
    const savedFavorites = localStorage.getItem('favorites');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav: any) => fav.id !== trackId);
      setIsFavorite(false);
    } else {
      // Add to favorites
      const newFavorite = {
        id: trackId,
        index: favorites.length + 1,
        title,
        artist,
        album,
        duration,
        cover,
      };
      favorites.push(newFavorite);
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleAddToQueue = () => {
    console.log(`Adding "${title}" to queue`);
    // TODO: Implement add to queue logic
  };

  const handleHideSong = () => {
    console.log(`Hiding song "${title}"`);
    // TODO: Implement hide song logic
  };

  const handleOpenArtist = () => {
    console.log(`Opening artist page for "${artist}"`);
    // TODO: Implement open artist logic
  };

  return (
    <div
      className="grid grid-cols-[50px_1fr_1fr_100px_80px] gap-4 items-center py-2 px-4 rounded hover:bg-accent group transition-colors cursor-pointer"
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
          <div className="text-xs text-muted-foreground truncate">{artist}</div>
        </div>
      </div>

      {/* Album */}
      <div className="text-sm text-muted-foreground truncate">{album}</div>

      {/* Duration */}
      <div className="text-sm text-muted-foreground text-right">{duration}</div>

      {/* Love Button */}
      <div className={cn("flex justify-end space-x-2", !isHovered && "opacity-0")}>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavorites();
          }}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
        </Button>

        {/* More Options */}
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
              Tambahkan ke Favorit
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
            <DropdownMenuItem onClick={handleOpenArtist}>
              <User className="mr-2 h-4 w-4" />
              Buka Artis
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
