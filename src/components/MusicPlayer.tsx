import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [progress, setProgress] = useState([30]);
  const [volume, setVolume] = useState([70]);

  const currentTrack = {
    title: "Song Title",
    artist: "Artist Name",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-24 px-4 flex items-center justify-between z-50">
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{currentTrack.title}</div>
          <div className="text-xs text-muted-foreground truncate">{currentTrack.artist}</div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-2/4 max-w-2xl">
        <div className="flex items-center space-x-4 mb-2">
          <Button
            size="icon"
            variant="ghost"
            className={cn("hover:bg-accent", isLiked && "text-red-500")}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn("hover:bg-accent", isShuffle && "text-primary")}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-accent">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-10 h-10 rounded-full"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-accent">
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn("hover:bg-accent", repeatMode > 0 && "text-primary")}
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
          >
            <Repeat className="w-4 h-4" />
          </Button>
        </div>
        {/* Progress Bar */}
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-muted-foreground w-10 text-right">1:32</span>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">3:45</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        <Volume2 className="w-5 h-5 text-muted-foreground" />
        <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-24" />
      </div>
    </div>
  );
};
