import { useState } from "react";
import { Play, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <div
      className="grid grid-cols-[50px_1fr_1fr_100px_50px] gap-4 items-center py-2 px-4 rounded hover:bg-accent group transition-colors cursor-pointer"
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

      {/* More Options */}
      <div className={cn("flex justify-end", !isHovered && "opacity-0")}>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
