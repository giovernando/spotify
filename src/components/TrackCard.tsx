import { useState, useEffect } from "react";
import { Play, MoreHorizontal, Plus, ListMusic, EyeOff } from "lucide-react";
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
}

export const TrackCard = ({ index, title, artist, album, duration, cover }: TrackCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
  }, []);

  const handleAddToPlaylist = (playlistId: number) => {
    console.log(`Adding "${title}" to playlist ${playlistId}`);
    // TODO: Implement add to playlist logic
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
    console.log(`Playing track "${title}" by ${artist}`);
    // TODO: Implement play track logic
  };

  return (
    <div
      className="grid grid-cols-[80px_1fr_1fr_100px_80px] gap-4 items-center py-2 px-4 rounded hover:bg-accent group transition-colors cursor-pointer"
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
      <div className="text-sm text-muted-foreground text-right">{duration}</div>

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
