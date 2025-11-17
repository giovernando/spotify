import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { TrackCard } from "@/components/TrackCard";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal } from "lucide-react";

const Playlist = () => {
  const { id } = useParams();

  const playlist = {
    title: "My Playlist #1",
    description: "Your favorite songs collection",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    totalTracks: 25,
    totalDuration: "1 hr 23 min",
  };

  const tracks = [
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
    {
      index: 3,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: "8:02",
      cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=50&h=50&fit=crop",
    },
    {
      index: 4,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: "6:30",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=50&h=50&fit=crop",
    },
    {
      index: 5,
      title: "Comfortably Numb",
      artist: "Pink Floyd",
      album: "The Wall",
      duration: "6:23",
      cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=50&h=50&fit=crop",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-24">
          {/* Playlist Header */}
          <div className="bg-gradient-to-b from-primary/30 to-background p-8">
            <div className="flex items-end space-x-6">
              <img
                src={playlist.cover}
                alt={playlist.title}
                className="w-56 h-56 rounded shadow-2xl"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-2">PLAYLIST</p>
                <h1 className="text-6xl font-bold mb-6">{playlist.title}</h1>
                <p className="text-muted-foreground mb-2">{playlist.description}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-semibold">{playlist.totalTracks} lagu</span>
                  <span>•</span>
                  <span className="text-muted-foreground">{playlist.totalDuration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 flex items-center space-x-4">
            <Button size="icon" className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-10 w-10">
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>

          {/* Track List */}
          <div className="px-6">
            <div className="grid grid-cols-[50px_1fr_1fr_100px_50px] gap-4 items-center py-2 px-4 text-sm text-muted-foreground border-b border-border mb-2">
              <div className="text-center">#</div>
              <div>JUDUL</div>
              <div>ALBUM</div>
              <div className="text-right">DURASI</div>
              <div></div>
            </div>
            {tracks.map((track) => (
              <TrackCard key={track.index} {...track} />
            ))}
          </div>
        </main>
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Playlist;
