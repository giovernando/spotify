import { useParams } from "react-router-dom";
import { TrackCard } from "@/components/TrackCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ArtistProps {
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
  };
  setCurrentTrack: (track: { title: string; artist: string; cover: string }) => void;
}

const Artist = ({ currentTrack, setCurrentTrack }: ArtistProps) => {
  const { artistName } = useParams<{ artistName: string }>();

  // Mock data for artist tracks - in a real app, this would come from an API
  const artistTracks = [
    {
      index: 1,
      title: "Song One",
      artist: artistName || "Unknown Artist",
      album: "Album One",
      duration: "3:45",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      index: 2,
      title: "Song Two",
      artist: artistName || "Unknown Artist",
      album: "Album One",
      duration: "4:12",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      index: 3,
      title: "Song Three",
      artist: artistName || "Unknown Artist",
      album: "Album Two",
      duration: "3:28",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      index: 4,
      title: "Song Four",
      artist: artistName || "Unknown Artist",
      album: "Album Two",
      duration: "5:01",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      index: 5,
      title: "Song Five",
      artist: artistName || "Unknown Artist",
      album: "Album Three",
      duration: "3:55",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div>
      {/* Artist Banner */}
      <div className="relative h-80 bg-gradient-to-b from-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 p-6 flex items-end h-full">
          <div className="flex items-end space-x-6">
            <div className="w-48 h-48 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-2xl flex items-center justify-center">
              <span className="text-6xl font-bold text-white">
                {artistName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium mb-2">Artist</p>
              <h1 className="text-6xl font-bold mb-4">{artistName}</h1>
              <p className="text-lg">{artistTracks.length} songs • 1,234,567 monthly listeners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold">Popular</h2>
          </div>
        </div>

        <div className="space-y-2">
          {artistTracks.map((track) => (
            <TrackCard
              key={track.index}
              index={track.index}
              title={track.title}
              artist={track.artist}
              album={track.album}
              duration={track.duration}
              cover={track.cover}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
